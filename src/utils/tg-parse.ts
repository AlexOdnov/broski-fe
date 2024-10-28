import type { TelegramWebApps } from 'telegram-webapps'
import { retrieveLaunchParams } from '@telegram-apps/bridge'

export function forceUpdateTgUser() {
	const launchParamUser = retrieveLaunchParams().initData?.user
	if (launchParamUser) {
		const tgUser: TelegramWebApps.WebAppUser = {
			id: launchParamUser.id,
			is_bot: launchParamUser.isBot,
			first_name: launchParamUser.firstName,
			last_name: launchParamUser.lastName,
			username: launchParamUser.username,
			language_code: launchParamUser.languageCode,
			is_premium: launchParamUser.isPremium ? launchParamUser.isPremium : undefined,
			added_to_attachment_menu: launchParamUser.addedToAttachmentMenu
				? launchParamUser.addedToAttachmentMenu
				: undefined,
			allows_write_to_pm: launchParamUser.allowsWriteToPm
				? launchParamUser.allowsWriteToPm
				: undefined,
			photo_url: launchParamUser.photoUrl
		}
		// @ts-expect-error
		Telegram.WebApp.initDataUnsafe.user = tgUser
	}
}
