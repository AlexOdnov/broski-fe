import { defineComponent } from 'vue'
import styles from './animated-icon.module.css'

export const NoticeIcon = defineComponent({
	name: 'NoticeIcon',
	props: {
		height: { type: Number, default: 24 },
		animated: { type: Boolean, default: true }
	},
	setup: (props) => {
		return () => (
			<img
				class={props.animated && styles.blink}
				style={{ height: `${props.height}px`, width: `${props.height}px` }}
				src="/images/notice.webp"
			/>
		)
	}
})
