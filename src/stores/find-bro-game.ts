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
import { randomValueByChance } from '@/utils/random'
import { envVariables } from '@/services/env'

export const INITIAL_ATTEMPTS_COUNT = 6

const BOX_VALUE = 'box'

const WIN_GAME_ELEMENTS = ['B', 'R', 'O']

const WIN_GAME_ELEMENTS_COUNT = WIN_GAME_ELEMENTS.length

const FAKE_GAME_ELEMENTS: IGameElement[] = [
	{
		isOpen: false,
		isPreview: false,
		value: 'B'
	},
	{
		isOpen: false,
		isPreview: false,
		value: null
	},
	{
		isOpen: false,
		isPreview: false,
		value: 'R'
	},
	{
		isOpen: false,
		isPreview: false,
		value: BOX_VALUE,
		image: '/images/box.webp'
	},
	{
		isOpen: false,
		isPreview: false,
		value: null
	},
	{
		isOpen: false,
		isPreview: false,
		value: 'O'
	}
]

const createGameField = (): IGameElement[] => {
	return randomValueByChance(envVariables.lootboxChance)
		? [
				...createFillGameElements(WIN_GAME_ELEMENTS),
				...createEmptyGameElements(5),
				{
					isOpen: false,
					isPreview: false,
					value: BOX_VALUE,
					image: '/images/box.webp'
				}
			]
		: [...createFillGameElements(WIN_GAME_ELEMENTS), ...createEmptyGameElements(6)]
}

export const useFindBroGameStore = defineStore('findBroGame', () => {
	const userStore = useUserStore()

	const [gameField, setGameField, resetGameField] = useState<IGameElement[]>(createGameField)
	const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Idle)
	const [remainAttempts, setRemainAttempts, resetRemainAttempts] =
		useState<number>(INITIAL_ATTEMPTS_COUNT)
	const [isGameLoading, setIsGameLoading] = useState<boolean>(false)

	const openedWinGameElements = computed(() =>
		gameField.value.filter((el) => el.isOpen && el.value && WIN_GAME_ELEMENTS.includes(el.value))
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

	const finishGame = async (withoutClaim = false) => {
		if (![GameStatus.Lose, GameStatus.Win].includes(gameStatus.value)) {
			return
		}

		if (gameStatus.value === GameStatus.Win && !withoutClaim) {
			userStore.changeUserScore(WIN_GAME_POINTS)
		}

		setGameStatus(GameStatus.Idle)
		resetRemainAttempts()
		resetGameField()
		if (userStore.userLegacy?.first_game) {
			setIsGameLoading(true)
			await userStore.loadUserLegacy()
			setIsGameLoading(false)
		}
	}

	const selectElement = (index: number) => {
		if (gameStatus.value !== GameStatus.InProgress) {
			return
		}

		if (gameField.value[index].isOpen) {
			return
		}

		// подменяем поле для первой игры
		if (userStore.userLegacy?.first_game) {
			const currentAttempt = INITIAL_ATTEMPTS_COUNT - remainAttempts.value
			if (!currentAttempt) {
				setGameField([...createEmptyGameElements(9)])
			}
			gameField.value[index] = FAKE_GAME_ELEMENTS[currentAttempt]
		}

		const element = gameField.value[index]

		element.isOpen = true
		setRemainAttempts(remainAttempts.value - 1)

		if (element.value === BOX_VALUE) {
			userStore.claimBox(1)
		}

		if (
			openedWinGameElements.value.length === WIN_GAME_ELEMENTS_COUNT &&
			(!gameField.value.some((el) => el.value === BOX_VALUE) ||
				gameField.value.find((el) => el.value === BOX_VALUE)?.isOpen)
		) {
			setGameStatus(GameStatus.Win)
			return
		}

		if (!remainAttempts.value) {
			openedWinGameElements.value.length === WIN_GAME_ELEMENTS_COUNT
				? setGameStatus(GameStatus.Win)
				: setGameStatus(GameStatus.Lose)
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
