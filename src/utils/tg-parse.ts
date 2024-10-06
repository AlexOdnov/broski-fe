let locationHash = ''
try {
	locationHash = location.hash.toString()
} catch (e) {
	//
}

function urlSafeDecode(urlencoded: string) {
	try {
		urlencoded = urlencoded.replace(/\+/g, '%20')
		return decodeURIComponent(urlencoded)
	} catch (e) {
		return urlencoded
	}
}

function urlParseHashParams(locationHash: string) {
	locationHash = locationHash.replace(/^#/, '')
	const params: Record<string, unknown> = {}
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
	console.log('hash', locationHash)

	const query_params = urlParseQueryString(locationHash)
	for (const k in query_params) {
		params[k] = query_params[k]
	}
	return params
}

function urlParseQueryString(queryString: string) {
	const params: Record<string, unknown> = {}
	if (!queryString.length) {
		return params
	}
	const queryStringParams = queryString.split('&')
	console.log('query', queryStringParams)

	let i, param, paramName, paramValue
	for (i = 0; i < queryStringParams.length; i++) {
		param = queryStringParams[i].split('=')
		console.log('param', param)
		paramName = urlSafeDecode(param[0])
		paramValue = param[1] === null ? null : urlSafeDecode(param[1])
		params[paramName] = paramValue
	}
	return params
}

export const initParams = urlParseHashParams(locationHash)
