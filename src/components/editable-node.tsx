import { forwardRef, memo, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { MindContext } from './code-mind'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { getMonacoContent } from '@/utils'

interface Props {
	generateNextSibling: () => void
	generateChild: () => void
	deleteCurrent: () => void
	node: MindNode
}

const _EditableNode = forwardRef<{ getContent: () => string; getType: () => NodeType; getCode: () => string }, Props>(
	(props, ref) => {
		const { generateNextSibling, generateChild, deleteCurrent, node } = props
		const { defaultMaxWidth, minWidth, updateLayout } = useContext(MindContext)

		const innerRef = useRef<HTMLDivElement>(null)
		const [value, setValue] = useState(node.value)
		const [editable, setEditable] = useState(false)
		const [type, setType] = useState<NodeType>(node.type || 'text')
		const [code, setCode] = useState(node.code || '')

		// Update node object values
		useEffect(() => {
			node.value = value
			node.type = type
			node.code = code
		}, [value, type, code])

		// New node can be edited immediately.
		useEffect(() => {
			if (node.isNew) {
				innerRef.current!.focus()
				setEditable(true)
				const selection = window.getSelection()
				selection?.selectAllChildren(innerRef.current!)

				node.isNew = false
			}
		}, [node])

		// Changes in height will trigger a global update of the lines.
		const [height, setHeight] = useState(0)
		useEffect(() => {
			updateLayout()
		}, [height])
		useEffect(() => {
			const resizeObserver = new ResizeObserver(() => {
				setHeight(innerRef.current!.scrollHeight)
			})

			resizeObserver.observe(innerRef.current!)

			return () => {
				resizeObserver.disconnect()
			}
		}, [innerRef.current])

		// Monaco Editor
		const editorRef = useRef<HTMLDivElement>(null)
		const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null)
		useEffect(() => {
			if (type === 'code' && editorRef.current && editable) {
				const _editor = monaco.editor.create(editorRef.current!, {
					value: code,
					language: 'typescript',
					minimap: { enabled: false },
					scrollbar: {
						vertical: 'hidden'
					},
					tabSize: 2,
					scrollBeyondLastLine: false
				})
				const _model = _editor.getModel()

				const end = () => {
					setCode(_editor.getValue())
					setValue(getMonacoContent(innerRef.current))
					_model?.dispose()
					_editor.dispose()
					setEditable(false)
					setEditor(null)
				}

				_editor.focus()

				_model?.onDidChangeContent(event => {
					if (_editor.getValue() === '/text') {
						setValue('')
						setCode('')
						setType('text')
						setTimeout(() => {
							innerRef.current?.focus()
							setEditable(true)
						}, 100)
					}
				})

				_editor.onDidBlurEditorWidget(end)

				_editor.onKeyDown(event => {
					if (event.keyCode === 9) {
						end()
						setTimeout(() => innerRef.current?.focus())
					}
				})

				setEditor(_editor)
			}
		}, [type, editorRef, editable, code])

		useImperativeHandle(
			ref,
			() => ({
				getContent() {
					if (type === 'code') return getMonacoContent(innerRef.current)
					return innerRef.current!.innerHTML
				},
				getType() {
					return type
				},
				getCode() {
					return editor ? editor.getValue() : code
				}
			}),
			[type, code, editor]
		)

		if (type === 'code') {
			return editable ? (
				<div className='h-[400px] w-[400px]  bg-white/90 py-4 pr-4' ref={innerRef}>
					<div ref={editorRef} className='h-full' />
				</div>
			) : (
				<div
					dangerouslySetInnerHTML={{ __html: value }}
					tabIndex={0}
					ref={innerRef}
					onClick={() => innerRef.current!.focus()}
					onDoubleClick={() => setEditable(true)}
					className='relative h-[400px] w-[400px] shrink-0 cursor-default break-all rounded bg-white/90 py-4 pr-4 font-medium outline-2 outline-offset-2 outline-focus focus:outline'
					onKeyDown={event => {
						if (event.key === 'Enter' && !event.shiftKey) {
							event.preventDefault()
							generateNextSibling()
						} else if (event.key === 'Tab') {
							event.preventDefault()
							generateChild()
						} else if (!editable && (event.key === 'Delete' || event.key === 'Backspace')) {
							deleteCurrent()
						}
					}}
				/>
			)
		} else
			return (
				<div
					dangerouslySetInnerHTML={{ __html: value }}
					tabIndex={0}
					ref={innerRef}
					onClick={() => innerRef.current!.focus()}
					onDoubleClick={() => setEditable(true)}
					onBlur={() => {
						setEditable(false)
						setValue(innerRef.current!.innerHTML)
					}}
					onKeyDown={event => {
						if (event.key === 'Enter' && !event.shiftKey) {
							event.preventDefault()
							generateNextSibling()
						} else if (event.key === 'Tab') {
							event.preventDefault()
							generateChild()
						} else if (event.key === 'Escape') {
							setEditable(false)
						} else if (!editable && /^[a-zA-Z/]$/.test(event.key)) {
							setEditable(true)
						} else if (
							(!editable || innerRef.current!.innerHTML === '') &&
							(event.key === 'Delete' || event.key === 'Backspace')
						) {
							deleteCurrent()
						} else if (event.key === 'e' && innerRef.current?.innerText === '/cod') {
							event.preventDefault()
							setValue('')
							setType('code')
						}
					}}
					contentEditable={editable}
					className='mind-node'
					style={{ maxWidth: defaultMaxWidth, minWidth }}
				/>
			)
	}
)

const EditableNode = memo(_EditableNode)

export default EditableNode
