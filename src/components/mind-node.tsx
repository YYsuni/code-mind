import { Dispatch, useCallback, useContext, useEffect, useRef, useState } from 'react'
import MindEdge from './mind-edge'
import { MindContext } from './code-mind'

interface Props {
	index?: number
	node: MindNode
	parentRef?: NodeRef
	parentChildren?: MindNode[]
	setParentChildren?: Dispatch<MindNode[]>
}

export function MindNode({ node: _node, parentRef, parentChildren, setParentChildren, index }: Props) {
	const { distance, gap, updateLayout } = useContext(MindContext)

	const [node, setNode] = useState(_node)
	const nodeRef = useRef<HTMLDivElement>(null)
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
			onKeyDown={event => {
				if (event.key === 'Enter' && parentChildren && setParentChildren) {
					generateNextSibling()
				} else if (event.key === 'Tab') {
					event.preventDefault()
					generateChild()
				}
			}}
			ref={nodeRef}
			tabIndex={0}
			className='w-max bg-white/90 font-medium rounded shrink-0 relative max-w-[200px] py-4 px-8 outline-focus focus:outline outline-2 outline-offset-2'>
			{node.value}

			<MindEdge childNode={nodeRef} parentNode={parentRef!} parentChildren={parentChildren} />
		</div>
	)

	if (Array.isArray(children) && children.length > 0) {
		return (
			<div className='flex items-center' style={{ columnGap: distance }}>
				{SingleNode}
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

	return SingleNode
}
