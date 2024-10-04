import * as Sentry from '@sentry/vue'

export class SentryError extends Error {
	constructor(name: string, ...params: (string | undefined)[]) {
		super(...params)

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, SentryError)
		}

		this.name = name
	}
}

export const useSentry = () => {
	const captureException = (error: SentryError | unknown, extra?: Record<string, unknown>) =>
		Sentry.captureException(error, { extra })

	return {
		captureException
	}
}
