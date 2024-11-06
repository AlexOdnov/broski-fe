import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import styles from './banner.module.css'
import { UiText } from '@/components/ui'
import { useLocalization } from '@/services/localization'
import { usePvpStore } from '@/stores/pvp'
import { envVariables } from '@/services/env'

export const UiBanner = defineComponent({
	name: 'UiBanner',
	props: {
		forceShow: { type: Boolean, default: false }
	},
	setup: (props) => {
		const { t } = useLocalization()
		const pvpStore = usePvpStore()

		const scriptTag = ref<HTMLScriptElement | null>(null)

		const isBannerVisible = computed(
			() => props.forceShow || (!pvpStore.isCharacterPremium && envVariables.enableInAppBanner)
		)

		onMounted(() => {
			if (!isBannerVisible.value) {
				return
			}
			scriptTag.value = document.createElement('script')
			scriptTag.value.src = 'https://js.onclckmn.com/static/onclicka.js'
			scriptTag.value.dataset.admpid = '231083'
			document.head.appendChild(scriptTag.value)
		})

		onBeforeUnmount(() => {
			if (!isBannerVisible.value) {
				return
			}
			scriptTag.value?.remove()
		})

		return () =>
			isBannerVisible.value ? (
				<div class={styles.bannerWrapper}>
					<div class={styles.banner} data-banner-id="6031971"></div>
					<UiText fontSize={'12px'} color={'#797979'} alignCenter>
						{t('noResponsibleForAd')}
					</UiText>
				</div>
			) : (
				<></>
			)
	}
})
