let tCanvas: HTMLCanvasElement | null = null
export function getTextWidth(text: string, font = 'normal 16px Poppins') {
	const canvas = tCanvas || (tCanvas = document.createElement('canvas'))
	const context = canvas.getContext('2d')
	context!.font = font
	return context!.measureText(text).width
}

export const currentState = { scale: 1 }

export function setCaretPosition(element: HTMLElement, start: number, end: number) {
	element.focus()
	const range = document.createRange()
	const selection = window.getSelection()
	range.setStart(element, start)
	range.setEnd(element, end)
	range.collapse(true)
	selection?.removeAllRanges()
	selection?.addRange(range)
}
