import * as Sentry from '@sentry/vue'
import type { AxiosError } from 'axios'

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

	const captureNetworkException = (error: unknown) => {
		const extra = {
			request: (error as AxiosError).request,
			response: (error as AxiosError).response,
			message: (error as AxiosError).message,
			cause: (error as AxiosError).cause
		}
		captureException(error, extra)
	}

	return {
		captureException,
		captureNetworkException
	}
}
