import * as Sentry from '@sentry/vue'

interface SentryError extends Error {
	[key: string]: unknown
}

export const useSentry = () => {
	const captureException = (error: SentryError) => Sentry.captureException(error)

	return {
		captureException
	}
}
