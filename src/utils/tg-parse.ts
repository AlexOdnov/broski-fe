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
	let i, param, paramName, paramValue
	for (i = 0; i < queryStringParams.length; i++) {
		param = queryStringParams[i].split('=')
		paramName = urlSafeDecode(param[0])
		if (param.length === 3 && param[1] === 'user') {
			console.log(param)

			console.log(urlSafeDecode(param[2]))
		}
		paramValue = param[1] === null ? null : urlSafeDecode(param[1])
		params[paramName] = paramValue
	}
	return params
}

export const initParams = urlParseHashParams(locationHash)
