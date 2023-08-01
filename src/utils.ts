let tCanvas: HTMLCanvasElement | null = null
export function getTextWidth(text: string, font = 'normal 16px Poppins') {
	const canvas = tCanvas || (tCanvas = document.createElement('canvas'))
	const context = canvas.getContext('2d')
	context!.font = font
	return context!.measureText(text).width
}

export function amendDistance(distance: number, siblings?: unknown[]) {
	if (siblings && siblings.length > 3) {
		return ((siblings.length - 3 + 5) / 5) * distance
	}
	return distance
}
