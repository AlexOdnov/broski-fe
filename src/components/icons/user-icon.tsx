import { defineComponent } from 'vue'

export const UserIcon = defineComponent({
	name: 'UserIcon',
	props: {
		height: { type: Number, default: 20 }
	},
	setup: (props) => {
		return () => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={props.height}
				height={props.height}
				viewBox="0 0 20 20"
				fill="none"
			>
				<path
					d="M7.5 0H12.5V1.25H13.75V2.5H15V7.5H13.75V8.75H12.5V10H7.5V8.75H6.25V7.5H5V2.5H6.25V1.25H7.5V0ZM8.75 6.25V7.5H11.25V6.25H12.5V3.75H11.25V2.5H8.75V3.75H7.5V6.25H8.75ZM5 11.25H15V12.5H17.5V13.75H18.75V15H20V20H0V15H1.25V13.75H2.5V12.5H5V11.25ZM3.75 16.25H2.5V17.5H17.5V16.25H16.25V15H13.75V13.75H6.25V15H3.75V16.25Z"
					fill="currentColor"
				/>
			</svg>
		)
	}
})
