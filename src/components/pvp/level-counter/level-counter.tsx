import { defineComponent } from 'vue'
import styles from './level-counter.module.css'
import { UiProgressBar, UiText } from '@/components/ui'
import { LevelIcon } from '@/components/icons'

export const LevelCounter = defineComponent({
	name: 'LevelCounter',
	props: {
		level: { type: Number, required: true },
		levelName: { type: String, required: true },
		expirience: { type: Number, required: true },
		expirienceLimit: { type: Number, required: true }
	},
	setup: (props) => {
		return () => (
			<div>
				<div class={styles.levelWrapper}>
					<UiText fontSize={'14px'} color={'#797979'}>
						<LevelIcon height={14} />
						&nbsp;lvl {props.level}:
					</UiText>
					&nbsp;
					<UiText fontSize={'14px'} isAccent>
						{props.levelName}
					</UiText>
				</div>
				<UiProgressBar
					totalItems={props.expirience}
					filledItems={props.expirienceLimit}
					mod={'filled'}
					height={10}
				/>
			</div>
		)
	}
})
