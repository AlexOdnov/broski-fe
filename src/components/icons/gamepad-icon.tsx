import { defineComponent } from 'vue'

export const GamepadIcon = defineComponent({
	name: 'GamepadIcon',
	props: {
		height: { type: Number, default: 18 }
	},
	setup: (props) => {
		return () => (
			<svg
				width={props.height * 1.611}
				height={props.height}
				viewBox="0 0 29 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M16.8636 0H12.1364V1.28571H7.40909V2.57143H5.04545V3.85714H3.86364V10.2857H2.68182V11.5714H1.5V16.7143H2.68182V18H5.04545V16.7143H6.22727V15.4286H7.40909V14.1429H10.9545V12.8571H18.0455V14.1429H21.5909V15.4286H22.7727V16.7143H23.9545V18H26.3182V16.7143H27.5V11.5714H26.3182V10.2857H25.1364V3.85714H23.9545V2.57143H21.5909V1.28571H16.8636V0Z"
					fill="#FFB800"
				/>
				<path
					d="M9.5 10H8.5V9.75H8.25V8.25H6.75V8H6.5V7H6.75V6.75H8.25V5.25H8.5V5H9.5V5.25H9.75V6.75H11.25V7H11.5V8H11.25V8.25H9.75V9.75H9.5M9.25 6V5.5H8.75V6H9.25Z"
					fill="#242424"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M17.5 9.5V8H15.8V8.25H15.5V9.25H15.8V9.5H17.5Z"
					fill="#242424"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M20.5 8.5V7H18.8V7.25H18.5V8.25H18.8V8.5H20.5Z"
					fill="#242424"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M23.5 7.5V6H21.8V6.25H21.5V7.25H21.8V7.5H23.5Z"
					fill="#242424"
				/>
			</svg>
		)
	}
})
