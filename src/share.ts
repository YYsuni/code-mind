export const initialNode: MindNode = {
	id: '0',
	value: 'CodeMind',
	children: [
		{ id: '1-0', value: 'Example 1', isFirstEdit: true },
		{ id: '1-1', value: 'Example 2', isFirstEdit: true }
	]
}

export const containerState = {
	_x: 0,
	_y: 0,
	wheelX: 0,
	wheelY: 0,

	x() {
		return this._x - this.wheelX
	},
	y() {
		return this._y - this.wheelY
	},
	scale: 1
}
