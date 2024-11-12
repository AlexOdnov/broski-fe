import { defineComponent, onMounted } from 'vue'
import { dropConfetti } from '@/utils/drop-confetti'

export const DropConfetti = defineComponent({
	name: 'DropConfetti',
	setup: () => {
		onMounted(async () => {
			await dropConfetti()
		})
		return () => null
	}
})
