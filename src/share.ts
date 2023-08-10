import { getLocalContainerState } from './lib/save'

export const initialNode: MindNode = {
	id: '0',
	value: 'CodeMind',
	children: [
		{ id: '1-0', value: 'Example 1', isFirstEdit: true },
		{ id: '1-1', value: 'Example 2', isFirstEdit: true }
	]
}

export const MAX_SCALE = 2.5
export const MIN_SCALE = 0.5

export const containerState = {
	initialX: 0,
	initialY: 0,
	offsetX: 0,
	offsetY: 0,
	wheelX: 0,
	wheelY: 0,
	x() {
		return this.offsetX - this.wheelX + this.initialX
	},
	y() {
		return this.offsetY - this.wheelY + this.initialY
	},

	scale: 1,

	...getLocalContainerState()
} as {
	initialX: number
	initialY: number
	offsetX: number
	offsetY: number
	wheelX: number
	wheelY: number
	x: () => number
	y: () => number
	scale: number
}

export const controls = {
	setScale(s: number) {},
	clearOffset() {}
}
