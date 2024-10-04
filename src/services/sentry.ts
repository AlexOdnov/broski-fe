import * as Sentry from '@sentry/vue'

export const useSentry = () => {
	const captureException = (error: Error) => {
		console.log(Sentry, error)

		Sentry.captureException(error)
	}

	return {
		captureException
	}
}
