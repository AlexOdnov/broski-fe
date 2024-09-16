export interface IGameElement {
	isOpen: boolean
	value: string | null
	image?: string
}

export enum GameStatus {
	Idle = 'idle',
	InProgress = 'inProgress',
	Lose = 'lose',
	Nothing = 'nothing',
	Win = 'win'
}

export const WIN_GAME_POINTS = 200

export const FIELD_PLACEHOLDERS = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']

const createEmptyGameElement = (): IGameElement => ({
	isOpen: false,
	value: null
})

export const createFillGameElements = (elements: string[]): IGameElement[] => {
	return elements.map((value) => ({
		isOpen: false,
		value
	}))
}

export const createEmptyGameElements = (count: number): IGameElement[] =>
	Array(count).fill(null).map(createEmptyGameElement)
