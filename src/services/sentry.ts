import * as Sentry from '@sentry/vue'

interface SentryErrorPayload {
	name: string
	[key: string]: unknown
}

export class SentryError extends Error {
	constructor(payload: SentryErrorPayload, ...params: (string | undefined)[]) {
		super(...params)

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, SentryError)
		}

		this.name = payload.name
	}
}

export const useSentry = () => {
	const captureException = (error: SentryError) => Sentry.captureException(error)

	return {
		captureException
	}
}
