import { defineComponent } from 'vue'

export const ConstructIcon = defineComponent({
	name: 'ConstructIcon',
	setup: () => {
		return () => (
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M4.28571 1.42857V4.28571H1.42857V1.42857H4.28571ZM0 0V5.71429H5.71429V0H0ZM11.4286 3.57143V6.42857H8.57143V3.57143H11.4286ZM7.14286 2.14286V7.85714H12.8571V2.14286H7.14286ZM4.28571 10V12.8571H1.42857V10H4.28571ZM0 8.57143V14.2857H5.71429V8.57143H0Z"
					fill="currentColor"
				/>
				<path
					d="M14.2858 5.71436V10.0001H10.0001V14.2858H5.71436V20.0001H20.0001V5.71436H14.2858ZM11.4286 11.4286H14.2858V14.2858H11.4286V11.4286ZM10.0001 18.5715H7.14293V15.7144H10.0001V18.5715ZM14.2858 18.5715H11.4286V15.7144H14.2858V18.5715ZM18.5715 18.5715H15.7144V15.7144H18.5715V18.5715ZM18.5715 14.2858H15.7144V11.4286H18.5715V14.2858ZM15.7144 10.0001V7.14293H18.5715V10.0001H15.7144Z"
					fill="currentColor"
				/>
			</svg>
		)
	}
})