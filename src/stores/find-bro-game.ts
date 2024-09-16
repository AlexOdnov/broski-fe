import { shuffle } from '@/utils/shuffle'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useState } from '@/utils/useState'
import { useUserStore } from './user'
import {
	createEmptyGameElements,
	createFillGameElements,
	GameStatus,
	WIN_GAME_POINTS,
	type IGameElement
} from '@/utils/games'

export const INITIAL_ATTEMPTS_COUNT = 6

const WIN_GAME_ELEMENTS_COUNT = 3

const createGameField = (): IGameElement[] => {
	return [...createFillGameElements(['B', 'R', 'O']), ...createEmptyGameElements(6)]
}

export const useFindBroGameStore = defineStore('findBroGame', () => {
	const userStore = useUserStore()

	const [gameField, setGameField, resetGameField] = useState<IGameElement[]>(createGameField)
	const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Idle)
	const [remainAttempts, setRemainAttempts, resetRemainAttempts] =
		useState<number>(INITIAL_ATTEMPTS_COUNT)
	const [isGameLoading, setIsGameLoading] = useState<boolean>(false)

	const openedWinGameElements = computed(() =>
		gameField.value.filter((el) => el.isOpen && el.value)
	)

	const setPreview = () => {
		setGameField(
			gameField.value.map((el) => ({ ...el, isPreview: el.value && !el.isOpen ? true : false }))
		)
	}

	const startGame = async () => {
		if (gameStatus.value !== GameStatus.Idle || userStore.userTickets <= 0 || isGameLoading.value) {
			return
		}
		setIsGameLoading(true)
		await userStore.loadUser()
		setIsGameLoading(false)
		if (userStore.userTickets > 0) {
			setGameField(shuffle(gameField.value))
			setGameStatus(GameStatus.InProgress)
			userStore.changeUserTickets(-1)
		}
	}

	const finishGame = (withoutClaim = false) => {
		if (![GameStatus.Lose, GameStatus.Win].includes(gameStatus.value)) {
			return
		}

		if (gameStatus.value === GameStatus.Win && !withoutClaim) {
			userStore.changeUserScore(WIN_GAME_POINTS)
		}

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

		if (openedWinGameElements.value.length === WIN_GAME_ELEMENTS_COUNT) {
			setGameStatus(GameStatus.Win)
			return
		}

		if (!remainAttempts.value) {
			setGameStatus(GameStatus.Lose)
			setPreview()
		}
	}

	return {
		gameField,
		gameStatus,
		remainAttempts,
		isGameLoading,
		startGame,
		finishGame,
		selectElement
	}
})
