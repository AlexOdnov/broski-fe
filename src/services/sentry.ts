import * as Sentry from '@sentry/vue'

export const useSentry = () => {
	const captureException = (error: Error) => Sentry.captureException(error)

	return {
		captureException
	}
}
