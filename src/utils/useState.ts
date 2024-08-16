import { ref, type Ref, computed, type ComputedRef } from 'vue'

declare function UseState<T>(
	defaultState: T
): [state: ComputedRef<T>, setState: (value: T) => void, resetState: () => void]

declare function UseState<T>(
	createDefaultState: () => T
): [state: ComputedRef<T>, setState: (value: T) => void, resetState: () => void]

export const useState: typeof UseState = <T>(defaultState: T) => {
	const _state = ref(typeof defaultState === 'function' ? defaultState() : defaultState) as Ref<T>

	const state = computed(() => _state.value)
	return [
		state,
		(value: T) => {
			_state.value = value
		},
		() => (_state.value = typeof defaultState === 'function' ? defaultState() : defaultState)
	]
}
