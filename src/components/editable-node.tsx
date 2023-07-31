import { forwardRef, memo, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { MindContext } from './code-mind'

interface Props {
	generateNextSibling: () => void
	generateChild: () => void
	deleteCurrent: () => void
	node: MindNode
}

const _EditableNode = forwardRef<{ getContent: () => string }, Props>((props, ref) => {
	const { generateNextSibling, generateChild, deleteCurrent, node } = props
	const { defaultMaxWidth, minWidth, updateLayout } = useContext(MindContext)

	const innerRef = useRef<HTMLDivElement>(null)
	const [value, setValue] = useState(node.value)
	const [editable, setEditable] = useState(false)

	useImperativeHandle(ref, () => ({
		getContent() {
			return innerRef.current!.innerHTML
		}
	}))

	useEffect(() => {
		if (node.isNew) {
			innerRef.current!.focus()
			const selection = window.getSelection()
			selection?.selectAllChildren(innerRef.current!)

			node.isNew = false
		}
	}, [node])

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
	}, [])

	return (
		<div
			dangerouslySetInnerHTML={{ __html: value }}
			tabIndex={0}
			ref={innerRef}
			onClick={() => innerRef.current!.focus()}
			onFocus={() => setEditable(true)}
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
				} else if (/^[a-zA-Z]$/.test(event.key)) {
					setEditable(true)
				} else if (innerRef.current!.innerHTML === '' && (event.key === 'Delete' || event.key === 'Backspace')) {
					deleteCurrent()
				}
			}}
			contentEditable={editable}
			className='relative w-max shrink-0 cursor-default break-all rounded bg-white/90 px-8 py-4 font-medium outline-2 outline-offset-2 outline-focus focus:outline'
			style={{ maxWidth: defaultMaxWidth, minWidth }}
		/>
	)
})

const EditableNode = memo(_EditableNode)

export default EditableNode
