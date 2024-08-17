import { shuffle } from '@/utils/shuffle'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useState } from '@/utils/useState'
import { useUserStore } from './user'

export interface IGameElement {
	isOpen: boolean
	value: string | null
}

export enum GameStatus {
	Idle = 'idle',
	InProgress = 'inProgress',
	Lose = 'lose',
	Win = 'win'
}

export const INITIAL_ATTEMPTS_COUNT = 4

const WIN_GAME_ELEMENTS_COUNT = 3

const createEmptyGameElement = (): IGameElement => ({
	isOpen: false,
	value: null
})

const createWinGameElements = (): IGameElement[] => {
	return ['B', 'R', 'O'].map((value) => ({
		isOpen: false,
		value
	}))
}

const createEmptyGameElements = (count: number): IGameElement[] =>
	Array(count).fill(null).map(createEmptyGameElement)

const createGameField = (): IGameElement[] => {
	return [...createWinGameElements(), ...createEmptyGameElements(6)]
}

export const useGameStore = defineStore('game', () => {
	const userStore = useUserStore()

	const [gameField, setGameField, resetGameField] = useState<IGameElement[]>(createGameField)
	const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Idle)
	const [remainAttempts, setRemainAttempts, resetRemainAttempts] =
		useState<number>(INITIAL_ATTEMPTS_COUNT)

	const openedWinGameElements = computed(() =>
		gameField.value.filter((el) => el.isOpen && el.value)
	)

	const startGame = () => {
		if (gameStatus.value !== GameStatus.Idle || !userStore.user?.tickets) {
			return
		}
		setGameField(shuffle(gameField.value))
		setGameStatus(GameStatus.InProgress)
		userStore.changeUserTickets(-1)
	}

	const finishGame = () => {
		if (![GameStatus.Lose, GameStatus.Win].includes(gameStatus.value)) {
			return
		}

		if (gameStatus.value === GameStatus.Win) {
			userStore.changeUserScore(100)
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
		}
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
