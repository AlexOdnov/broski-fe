import { defineComponent } from 'vue'
import styles from './styles.module.css'
import { UiText } from '../ui'

export const DisabledScreen = defineComponent({
	name: 'DisabledScreen',
	setup: () => {
		return () => (
			<div class={styles.disabledScreen}>
				<UiText fontSize={'24px'} fontFamily={'barcadeBrawl'} alignCenter lineHeight={'36px'}>
					bro we’re updating the app, will come back soon, thanks
				</UiText>
			</div>
		)
	}
})
