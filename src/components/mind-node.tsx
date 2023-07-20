import { Dispatch, useCallback, useContext, useEffect, useRef, useState } from 'react'
import MindEdge from './mind-edge'
import { MindContext } from './code-mind'
import TextareaAutosize from 'react-textarea-autosize'
import { getTextWidth } from '../utils'

interface Props {
	index?: number
	node: MindNode
	parentRef?: NodeRef
	parentChildren?: MindNode[]
	setParentChildren?: Dispatch<MindNode[]>
}

export function MindNode({ node: _node, parentRef, parentChildren, setParentChildren, index }: Props) {
	const { distance, gap, updateLayout, defaultMaxWidth } = useContext(MindContext)

	const [node, setNode] = useState(_node)
	const nodeRef = useRef<HTMLDivElement>(null)

	const [value, setValue] = useState(node.value)
	const [editable, setEditable] = useState(false)
	const [dynamicWidth, setDynamicWidth] = useState(getTextWidth(value) + 64 + 16)
	useEffect(() => {
		updateLayout()
	}, [editable])
	useEffect(() => {
		const width = getTextWidth(value) + 64 + 16

		if (width <= defaultMaxWidth + 16) setDynamicWidth(width)
	}, [value])

	const [children, setChildren] = useState(node.children)

	const generateNextSibling = useCallback(() => {
		if (parentChildren && setParentChildren) {
			const nextIndex = (index || 0) + 1
			const nextNode: MindNode = {
				id: String(Date.now()),
				value: 'Example ' + (parentChildren.length + 1),
				isNew: true
			}
			parentChildren.splice(nextIndex, 0, nextNode)
			setParentChildren(parentChildren.slice())
			updateLayout()
		}
	}, [parentChildren, index])

	const generateChild = useCallback(() => {
		if (!Array.isArray(children)) {
			setChildren([{ id: String(Date.now()), value: 'Example 1', isNew: true }])
		} else {
			setChildren([...children, { id: String(Date.now()), value: 'Example ' + (children.length + 1), isNew: true }])
		}
		updateLayout()
	}, [children])

	useEffect(() => {
		if (node.isNew) {
			setTimeout(() => nodeRef.current?.focus(), 0)
			setNode({ ...node, isNew: false })
		}
	}, [node])

	const SingleNode = (
		<div
			onDoubleClick={() => setEditable(true)}
			onKeyDown={event => {
				if (event.key === 'Enter' && !event.shiftKey && parentChildren && setParentChildren) {
					generateNextSibling()
				} else if (event.key === 'Tab') {
					event.preventDefault()
					generateChild()
				} else if (/^[a-zA-Z]$/.test(event.key)) {
					setEditable(true)
				}
			}}
			ref={nodeRef}
			tabIndex={0}
			className='w-max bg-white/90 break-words font-medium rounded shrink-0 relative py-4 px-8 outline-focus focus:outline outline-2 outline-offset-2'
			style={{ maxWidth: defaultMaxWidth }}>
			{value}

			<MindEdge childNode={nodeRef} parentNode={parentRef!} parentChildren={parentChildren} />
		</div>
	)
	const TextareaNode = (
		<div className='relative shrink-0'>
			<TextareaAutosize
				onHeightChange={() => updateLayout()}
				value={value}
				ref={nodeRef as unknown as React.RefObject<HTMLTextAreaElement>}
				onInput={e => setValue((e.target as HTMLTextAreaElement).value)}
				onBlur={() => setEditable(false)}
				onKeyDown={event => {
					if (event.key === 'Escape') {
						setEditable(false)
					} else if (event.key === 'Enter' && !event.shiftKey && parentChildren && setParentChildren) {
						setEditable(false)
						generateNextSibling()
					}
				}}
				className='py-4 px-8 rounded resize-none block bg-white/90 font-medium outline-focus focus:outline outline-2 outline-offset-2'
				style={{ maxWidth: defaultMaxWidth, width: dynamicWidth }}
				autoFocus
			/>

			<MindEdge childNode={nodeRef} parentNode={parentRef!} parentChildren={parentChildren} />
		</div>
	)
	const CurrentNode = editable ? TextareaNode : SingleNode

	if (Array.isArray(children) && children.length > 0) {
		return (
			<div className='flex items-center' style={{ columnGap: distance }}>
				{CurrentNode}
				<div className='flex flex-col' style={{ rowGap: gap }}>
					{children.map((item, index) => (
						<MindNode
							key={item.id}
							index={index}
							node={item}
							parentRef={nodeRef}
							parentChildren={children}
							setParentChildren={setChildren}
						/>
					))}
				</div>
			</div>
		)
	}

	return CurrentNode
}
