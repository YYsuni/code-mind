import { createStore, useStore } from 'zustand'

export const selectStateStore = createStore(() => ({
	current: null as NodeElement | null
}))

export function useSelectState() {
	const store = useStore(selectStateStore)

	return store
}

export const containerListener = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
	const target = event.target

	if (target && target instanceof HTMLDivElement && target.id === 'mind-node') {
		// Nothing now
	} else {
		selectStateStore.setState({ current: null })
	}
}

window.addEventListener(
	'focus',
	event => {
		const target = event.target
		if (target && target instanceof HTMLDivElement && target.id === 'mind-node') {
			if (target !== selectStateStore.getState().current) selectStateStore.setState({ current: target })
		}
	},
	{ capture: true }
)
