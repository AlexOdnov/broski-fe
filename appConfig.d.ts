interface Window {
	initCdTma: ({ id: number }) => Promise<() => Promise<void>>
	Adsgram: {
		init: (props: InitProps) => AdController
	}
}

interface InitProps {
	blockId: string
	debug?: boolean
	debugBannerType?: 'FullscreenMedia' | 'RewardedVideo'
}

interface ShowPromiseResult {
	done: boolean // true if user watch till the end, otherwise false
	description: string // event description
	state: 'load' | 'render' | 'playing' | 'destroy' // banner state
	error: boolean // true if event was emitted due to error, otherwise false
}

interface AdController {
	show: () => Promise<ShowPromiseResult>
}
