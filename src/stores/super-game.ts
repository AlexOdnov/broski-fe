import { shuffle } from '@/utils/shuffle'
import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import { useUserStore } from './user'
import { GameStatus, WIN_GAME_POINTS, type IGameElement } from '@/utils/games'

export const INITIAL_ATTEMPTS_COUNT = 1

const WIN_GAME_ELEMENT = {
	isOpen: false,
	isPreview: false,
	value: GameStatus.Win,
	image: '/images/fist-small.webp'
}

const createGameField = (): IGameElement[] => {
	return [
		{
			isOpen: false,
			isPreview: false,
			value: GameStatus.Lose,
			image: '/images/chicken.webp'
		},
		{
			isOpen: false,
			isPreview: false,
			value: ''
		},
		{ ...WIN_GAME_ELEMENT }
	]
}

export const useSuperGameStore = defineStore('superGame', () => {
	const userStore = useUserStore()

	const [gameField, setGameField, resetGameField] = useState<IGameElement[]>(createGameField)
	const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Idle)
	const [remainAttempts, setRemainAttempts, resetRemainAttempts] =
		useState<number>(INITIAL_ATTEMPTS_COUNT)

	const setPreview = () => {
		setGameField(gameField.value.map((el) => ({ ...el, isPreview: !el.isOpen ? true : false })))
	}

	const startGame = async () => {
		if (gameStatus.value !== GameStatus.Idle) {
			return
		}
		setGameField(shuffle(gameField.value))
		setGameStatus(GameStatus.InProgress)
	}

	const finishGame = () => {
		if (![GameStatus.Lose, GameStatus.Win, GameStatus.Nothing].includes(gameStatus.value)) {
			return
		}

		switch (gameStatus.value) {
			case GameStatus.Lose:
				userStore.changeUserScore(-WIN_GAME_POINTS)
				break

			case GameStatus.Nothing:
				userStore.changeUserScore(WIN_GAME_POINTS)
				break

			case GameStatus.Win:
				userStore.changeUserScore(WIN_GAME_POINTS * 5)
				break
			default:
				break
		}

		setGameStatus(GameStatus.Idle)
		resetRemainAttempts()
		resetGameField()
		if (userStore.userLegacy?.first_game) {
			userStore.loadUserLegacy()
		}
	}

	const selectElement = (index: number) => {
		if (gameStatus.value !== GameStatus.InProgress) {
			return
		}

		const realElement = gameField.value[index]

		if (realElement.isOpen) {
			return
		}

		// подменяем поле для первой игры
		if (userStore.userLegacy?.first_game) {
			const winIndex = gameField.value.findIndex((el) => el.value === WIN_GAME_ELEMENT.value)
			gameField.value[winIndex] = { ...realElement }
			gameField.value[index] = { ...WIN_GAME_ELEMENT }
		}

		const element = gameField.value[index]

		element.isOpen = true
		setRemainAttempts(remainAttempts.value - 1)

		switch (element.value) {
			case GameStatus.Lose:
				setGameStatus(GameStatus.Lose)
				break
			case GameStatus.Win:
				setGameStatus(GameStatus.Win)
				break
			default:
				setGameStatus(GameStatus.Nothing)
				break
		}

		setPreview()
	}

	return {
		gameField,
		gameStatus,
		remainAttempts,
		startGame,
		finishGame,
		selectElement
	}
})
