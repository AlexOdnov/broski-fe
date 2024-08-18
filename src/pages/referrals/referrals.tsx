import { defineComponent } from 'vue'

import styles from './styles.module.css'
import { useTgSdkStore } from '@/stores/tg-sdk'

const ReferralsPage = defineComponent({
	name: 'ReferralsPage',
	setup() {
		const tgStore = useTgSdkStore()
		return () => <div>start param - {tgStore.startParam}</div>
	}
})

export default ReferralsPage
