import { defineComponent } from 'vue'

export const DollarIcon = defineComponent({
	name: 'DollarIcon',
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
					d="M14.3299 17.1436V11.4307H11.537V17.1436H14.3299ZM8.74399 8.57422V2.86133H5.95102V8.57422H8.74399ZM3.15805 20V17.1436H0.365082V14.2871H5.95102V17.1436H8.74399V11.4307H3.15805V8.57422H0.365082V2.86133H3.15805V0H17.1229V2.86133H19.9206V5.71777H14.3299V2.86133H11.537V8.57422H17.1229V11.4307H19.9206V17.1436H17.1229V20H3.15805Z"
					fill="currentColor"
				/>
			</svg>
		)
	}
})
