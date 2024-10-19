import { defineComponent } from 'vue'

export const BackArrowIcon = defineComponent({
	name: 'BackArrowIcon',
	setup: () => {
		return () => (
			<svg
				width="16"
				height="14"
				viewBox="0 0 16 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M6 0H8V4H14V6H16V12H14V10H8V14H6V12H4V10H2V8H0V6H2V4H4V2H6V0Z" fill="#FFB800" />
			</svg>
		)
	}
})
