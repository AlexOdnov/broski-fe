export const tgReload = async (): Promise<boolean> => {
	return new Promise<boolean>((resolve) => {
		const scriptTag = document.createElement('script')
		scriptTag.src = 'https://telegram.org/js/telegram-web-app.js'
		scriptTag.addEventListener('load', () => resolve(true))
		scriptTag.addEventListener('error', () => resolve(false))
		document.head.appendChild(scriptTag)
	})
}
