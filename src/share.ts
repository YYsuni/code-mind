import { getLocalContainerState } from './lib/save'

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
