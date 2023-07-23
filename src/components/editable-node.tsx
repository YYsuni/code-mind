import { forwardRef, memo, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { MindContext } from './code-mind'
import { setCaretPosition } from '../utils'

interface Props {
	generateNextSibling: () => void
	generateChild: () => void
	node: MindNode
}

function _EditableNode(props: Props) {
	const { generateNextSibling, generateChild, node } = props
	const { defaultMaxWidth, minWidth, updateLayout } = useContext(MindContext)

	const ref = useRef<HTMLDivElement>(null)
	const [value, setValue] = useState(node.value)
	const [editable, setEditable] = useState(false)

	useEffect(() => {
		if (node.isNew) {
			ref.current!.focus()
			const selection = window.getSelection()
			selection?.selectAllChildren(ref.current!)

			node.isNew = false
		}
	}, [node])

	const [height, setHeight] = useState(0)
	useEffect(() => {
		updateLayout()
	}, [height])
	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			setHeight(ref.current!.scrollHeight)
		})

		resizeObserver.observe(ref.current!)

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	return (
		<div
			dangerouslySetInnerHTML={{ __html: value }}
			tabIndex={0}
			ref={ref}
			onClick={() => ref.current!.focus()}
			onFocus={() => setEditable(true)}
			onBlur={() => {
				setEditable(false)
				setValue(ref.current!.innerHTML)
			}}
			onKeyDown={event => {
				if (event.key === 'Enter' && !event.shiftKey) {
					event.preventDefault()
					generateNextSibling()
				} else if (event.key === 'Tab') {
					event.preventDefault()
					generateChild()
				} else if (/^[a-zA-Z]$/.test(event.key)) {
					setEditable(true)
				}
			}}
			contentEditable={editable}
			className='w-max bg-white/90 cursor-default break-all font-medium rounded shrink-0 relative py-4 px-8 outline-focus focus:outline outline-2 outline-offset-2'
			style={{ maxWidth: defaultMaxWidth, minWidth }}
		/>
	)
}

const EditableNode = memo(_EditableNode)

export default EditableNode
