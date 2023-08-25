import { createStore, useStore } from 'zustand'

export const focusStateStore = createStore(() => ({
	current: null as NodeElement | null
}))

export function useFocusState() {
	const store = useStore(focusStateStore)

	return store
}

window.addEventListener(
	'focus',
	event => {
		const target = event.target
		if (target && target instanceof HTMLDivElement && target.id === 'mind-node') {
			focusStateStore.setState({ current: target })
		}
	},
	{ capture: true }
)
window.addEventListener(
	'blur',
	event => {
		const target = event.target
		if (target && target instanceof HTMLDivElement && target.id === 'mind-node') {
			if (target === focusStateStore.getState().current) focusStateStore.setState({ current: null })
		}
	},
	{ capture: true }
)
