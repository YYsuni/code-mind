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

export function getMonacoContent(monacoElement?: HTMLDivElement | null) {
	if (!monacoElement) return ''

	const marginElement = monacoElement.querySelector('.monaco-editor .margin-view-overlays')

	const contentElement = monacoElement.querySelector('.monaco-editor .view-lines')

	if (marginElement && contentElement) {
		return `<div class="monaco-editor" style="position: relative; display: flex;--vscode-editorCodeLens-lineHeight: 16px; --vscode-editorCodeLens-fontSize: 12px; --vscode-editorCodeLens-fontFeatureSettings: &quot;liga&quot; off, &quot;calt&quot; off; --code-editorInlayHintsFontFamily: Consolas, 'Courier New', monospace;">${marginElement.outerHTML}<div style="position: absolute; overflow: hidden; left: 64px; width: 320px; height: 368px;">${contentElement.outerHTML}</div>  </div>`
	}

	return ''
}
