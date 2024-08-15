import { ref, type Ref } from 'vue'

export const useState = <T>(defaultState: T): [Ref<T>, (value: T) => void, () => void] => {
	const state = ref(defaultState) as Ref<T>
	return [
		state,
		(value: T) => {
			state.value = value
		},
		() => (state.value = defaultState)
	]
}
