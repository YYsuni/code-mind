import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
	getWorker(_: any, label: string) {
		if (label === 'json') {
			return new jsonWorker()
		}

		if (label === 'typescript' || label === 'javascript') {
			return new tsWorker()
		}
		return new editorWorker()
	}
}

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)

// Import the relevant CSS files directly.
monaco.editor.create(document.createElement('div'), {
	value: '',
	language: 'typescript',
	minimap: { enabled: false },
	scrollbar: {
		vertical: 'hidden'
	},
	tabSize: 2,
	scrollBeyondLastLine: false
})
