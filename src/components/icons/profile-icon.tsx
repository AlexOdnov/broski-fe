import { defineComponent } from 'vue'

export const ProfileIcon = defineComponent({
	name: 'ProfileIcon',
	props: {
		size: { type: Number, default: 13}
	},
	setup: (props) => {
		return () => (
			<svg
				width={props.size}
				height={props.size}
				viewBox="0 0 13 13"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6.5 0.5C7.29565 0.5 8.05871 0.81607 8.62132 1.37868C9.18393 1.94129 9.5 2.70435 9.5 3.5C9.5 4.29565 9.18393 5.05871 8.62132 5.62132C8.05871 6.18393 7.29565 6.5 6.5 6.5C5.70435 6.5 4.94129 6.18393 4.37868 5.62132C3.81607 5.05871 3.5 4.29565 3.5 3.5C3.5 2.70435 3.81607 1.94129 4.37868 1.37868C4.94129 0.81607 5.70435 0.5 6.5 0.5ZM6.5 8C9.815 8 12.5 9.3425 12.5 11V12.5H0.5V11C0.5 9.3425 3.185 8 6.5 8Z"
					fill="#4E4F4F"
				/>
			</svg>
		)
	}
})
