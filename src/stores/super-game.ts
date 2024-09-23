import { shuffle } from '@/utils/shuffle'
import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import { useUserStore } from './user'
import { GameStatus, type IGameElement } from '@/utils/games'
import { useTgSdkStore } from './tg-sdk'
import { useApi } from '@/api/useApi'

export const INITIAL_ATTEMPTS_COUNT = 1

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
			value: GameStatus.Win,
			image: '/images/fist-small.webp'
		},
		{
			isOpen: false,
			isPreview: false,
			value: ''
		}
	]
}

export const useSuperGameStore = defineStore('superGame', () => {
	const userStore = useUserStore()
	const tgStore = useTgSdkStore()
	const api = useApi()

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

	const finishGame = async () => {
		if (![GameStatus.Lose, GameStatus.Win, GameStatus.Nothing].includes(gameStatus.value)) {
			return
		}

		await api.finishSuperGame({
			user_id: tgStore.userId,
			result: gameStatus.value as 'win' | 'nothing' | 'lose'
		})
		userStore.loadUser()

		setGameStatus(GameStatus.Idle)
		resetRemainAttempts()
		resetGameField()
	}

	const selectElement = (index: number) => {
		if (gameStatus.value !== GameStatus.InProgress) {
			return
		}

		const element = gameField.value[index]

		if (element.isOpen) {
			return
		}

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
