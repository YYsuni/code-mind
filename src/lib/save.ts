import { initialNode } from '../consts'
import { getStorage, setStorage } from './storage'
import { toast } from 'sonner'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const stateStore: { current: MindNode[]; saveHandle: () => void } = { current: [], saveHandle: () => {} }

export const getLocalNodeTree = () => {
	const state: MindNode[] = JSON.parse(getStorage('state') || '')

	if (state) {
		const rootNode = state.find(item => !item.parentID) as MindNode

		const nodeMap = new Map<string | undefined, MindNode>()
		state.forEach(item => {
			nodeMap.set(item.id, item)
		})
		state.forEach(item => {
			if (nodeMap.has(item.parentID)) {
				const node = nodeMap.get(item.parentID)

				if (Array.isArray(node!.children)) {
					node!.children.push(item)
				} else {
					node!.children = [item]
				}
			}
		})

		return rootNode
	}

	return initialNode
}

async function save() {
	return new Promise(resolve => {
		stateStore.current = []

		stateStore.saveHandle()

		setTimeout(() => {
			const state = JSON.stringify(stateStore.current)

			setStorage('state', state)

			resolve(true)
		}, 0)
	})
}

window.addEventListener('keydown', async event => {
	if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
		event.preventDefault()
		await save()
		toast.success('Saved to local storage!')
	}
})