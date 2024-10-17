import { defineComponent } from 'vue'

export const CircledStarIcon = defineComponent({
	name: 'CircledStarIcon',
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
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8 0V1H6V2H4V4H2V6H1V8H0V12H1V14H2V16H4V18H6V19H8V20H12V19H14V18H16V16H18V14H19V12H20V8H19V6H18V4H16V2H14V1H12V0H8ZM3.21177 5.47452L3.77746 6.0402L2.64609 7.17157L3.21177 7.73726L2.0804 8.86863L3.21177 10L2.0804 11.1314L3.21177 12.2627L2.64609 12.8284L3.77746 13.9598L3.21177 14.5255L5.47452 16.7882L6.0402 16.2225L7.17157 17.3539L7.73726 16.7882L8.86863 17.9196L10 16.7882L11.1314 17.9196L12.2627 16.7882L12.8284 17.3539L13.9598 16.2225L14.5255 16.7882L16.7882 14.5255L16.2225 13.9598L17.3539 12.8284L16.7882 12.2627L17.9196 11.1314L16.7882 10L17.9196 8.86863L16.7882 7.73726L17.3539 7.17157L16.2225 6.0402L16.7882 5.47452L14.5255 3.21177L13.9598 3.77746L12.8284 2.64609L12.2627 3.21177L11.1314 2.0804L10 3.21177L8.86863 2.0804L7.73726 3.21177L7.17157 2.64609L6.0402 3.77746L5.47452 3.21177L3.21177 5.47452Z"
					fill="#4E4F4F"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M9.1 5H10.9V6.80023H12.25V7.70001H14.5V8.60001V9.50002H12.7V10.4H12.25V11.3H7.74999V10.4H7.29999V9.50002H5.49998V8.60001V7.70001H7.74999V6.80023H9.1V5ZM13 11.3002H6.99998V12.2H6.39999V13.1V14H8.2V13.1H9.1V12.2002H10.9V13.1H11.8V14H13.6V13.1V12.2H13V11.3002Z"
					fill="#4E4F4F"
				/>
			</svg>
		)
	}
})
