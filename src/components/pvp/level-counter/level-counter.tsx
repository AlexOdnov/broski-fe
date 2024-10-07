import { defineComponent } from 'vue'
import styles from './level-counter.module.css'
import { UiProgressBar, UiText } from '@/components/ui'
import { LevelIcon } from '@/components/icons'

export const LevelCounter = defineComponent({
	name: 'LevelCounter',
	props: {
		level: { type: Number, required: true },
		expirience: { type: Number, required: true },
		expirienceLimit: { type: Number, required: true }
	},
	setup: (props) => {
		return () => (
			<div>
				<div class={styles.levelWrapper}>
					<UiText fontSize={'14px'} color={'#797979'}>
						<LevelIcon height={14} />
						&nbsp;lvl {props.level}
					</UiText>
					<div>
						<UiText fontSize={'14px'} isAccent>
							Exp:
						</UiText>
						&nbsp;
						<UiText fontSize={'14px'} color={'#F0F0F0'}>
							{props.expirience}/{props.expirienceLimit}
						</UiText>
					</div>
				</div>
				<UiProgressBar
					totalItems={props.expirienceLimit}
					filledItems={props.expirience}
					height={10}
				/>
			</div>
		)
	}
})
