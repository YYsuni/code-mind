let tCanvas: HTMLCanvasElement | null = null
export function getTextWidth(text: string, font = 'normal 16px Poppins') {
	const canvas = tCanvas || (tCanvas = document.createElement('canvas'))
	const context = canvas.getContext('2d')
	context!.font = font
	return context!.measureText(text).width
}

export const currentState = { scale: 1 }
