import { defineComponent, onMounted } from 'vue'
import { confetti } from "@tsparticles/confetti";
const confettiOptions = {
	/**
	 * @deprecated use count property instead
	 */
	particleCount: 50,
	/**
	 * @deprecated use position property instead
	 */
	origin: {
		x: 0.5,
		y: 0.5,
	},
	//------------------------------------------
	angle: 90,
	count: 150,
	position: {
		x: 50,
		y: 50,
	},
	spread: 360,
	startVelocity: 45,
	decay: 0.9,
	gravity: 1,
	drift: 20,
	ticks: 200,
	colors: ["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],
	shapes: ["square", "circle"],
	scalar: 1,
	zIndex: 100,
	disableForReducedMotion: true,
}
export const DropConfetti = defineComponent({
	name: "DropConfetti",
	setup: () => {
		onMounted(async() => {
			await confetti('tsparticles', confettiOptions)
		})
		return () => null
	}
})
