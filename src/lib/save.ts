import { isObject } from '@/utils'
import { containerState } from '../share'
import { getStorage, setStorage } from './storage'
import { toast } from 'sonner'
import { initialNode } from '@/consts'

export const stateStore = {
	current: [] as MindNode[],
	saveHandle: () => {},
	local: getLocalNodeTree()
}

export function getLocalNodeTree() {
	const local = getStorage('state')

	if (local) {
		const state: MindNode[] = JSON.parse(local)

		if (Array.isArray(state)) {
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
	}

	return initialNode
}

export function getLocalContainerState() {
	const local = getStorage('container')

	if (local) {
		const state = JSON.parse(local)

		if (isObject(state)) {
			return state
		}
	}

	return null
}

async function save() {
	return new Promise(resolve => {
		stateStore.current = []

		stateStore.saveHandle()

		setTimeout(() => {
			const state = JSON.stringify(stateStore.current)

			setStorage('state', state)
			saveContainerState()

			resolve(true)
		}, 0)
	})
}

function saveContainerState() {
	const containerState_amend = {
		initialX: containerState.x(),
		initialY: containerState.y(),
		scale: containerState.scale
	}

	setStorage('container', JSON.stringify(containerState_amend))
}

window.addEventListener('keydown', async event => {
	if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
		event.preventDefault()
		await save()
		toast.success('Saved to local storage!')
	}
})
