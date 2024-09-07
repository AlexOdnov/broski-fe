interface Window {
	appConfig: {
		baseUrl: string
		botLink: string
	}
	initCdTma: ({id: number}) => Promise<() => Promise<void>>
}
