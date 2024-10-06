import type { TelegramWebApps } from 'telegram-webapps'

function urlSafeDecode(urlencoded: string) {
	try {
		urlencoded = urlencoded.replace(/\+/g, '%20')
		return decodeURIComponent(urlencoded)
	} catch (e) {
		return urlencoded
	}
}

function urlParseQueryString(queryString: string) {
	const params: Record<string, string> = {}
	if (!queryString.length) {
		return params
	}
	const queryStringParams = queryString.split('&')
	for (let i = 0; i < queryStringParams.length; i++) {
		const param = queryStringParams[i].split('=')
		if (param.length === 3 && param[1] === 'user') {
			return {
				user: urlSafeDecode(param[2])
			}
		}
	}
	return params
}

function urlParseHashParams(locationHash: string) {
	locationHash = locationHash.replace(/^#/, '')
	const params: Record<string, string> = {}
	if (!locationHash.length) {
		return params
	}
	if (locationHash.indexOf('=') < 0 && locationHash.indexOf('?') < 0) {
		return params
	}
	const qIndex = locationHash.indexOf('?')
	if (qIndex >= 0) {
		locationHash = locationHash.substr(qIndex + 1)
	}
	const query_params = urlParseQueryString(locationHash)
	for (const k in query_params) {
		params[k] = query_params[k]
	}
	return params
}

function getTgUserInfo() {
	let tgUser: null | TelegramWebApps.WebAppUser = null
	let locationHash = ''
	try {
		locationHash = location.hash.toString()
	} catch (error) {
		console.warn(error)
	}
	const initParams = urlParseHashParams(locationHash)
	try {
		tgUser = JSON.parse(initParams.user)
	} catch (error) {
		console.warn(error)
	}
	return tgUser
}

export function forceUpdateTgUser() {
	// @ts-expect-error
	Telegram.WebApp.initDataUnsafe.user = getTgUserInfo()
}
