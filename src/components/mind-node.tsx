import { Dispatch, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import MindEdge from './mind-edge'
import { MindContext } from './code-mind'
import TextareaAutosize from 'react-textarea-autosize'
import { getTextWidth } from '../utils'
import EditableNode from './editable-node'

interface Props {
	index?: number
	node: MindNode
	parentRef?: NodeRef
	parentChildren?: MindNode[]
	setParentChildren?: Dispatch<MindNode[]>
}

export function MindNode({ node, parentRef, parentChildren, setParentChildren, index }: Props) {
	const { distance, gap, updateLayout } = useContext(MindContext)

	const nodeRef = useRef<HTMLDivElement>(null)

	const [children, setChildren] = useState(node.children)

	const generateNextSibling = useCallback(() => {
		if (parentChildren && setParentChildren) {
			const nextIndex = (index || 0) + 1
			const nextNode: MindNode = {
				id: String(Date.now()),
				value: 'Example ' + (parentChildren.length + 1),
				isNew: true,
				isFirstEdit: true
			}
			parentChildren.splice(nextIndex, 0, nextNode)
			setParentChildren(parentChildren.slice())
			updateLayout()
		}
	}, [parentChildren, index])

	const generateChild = useCallback(() => {
		if (!Array.isArray(children)) {
			setChildren([{ id: String(Date.now()), value: 'Example 1', isNew: true, isFirstEdit: true }])
		} else {
			setChildren([
				...children,
				{ id: String(Date.now()), value: 'Example ' + (children.length + 1), isNew: true, isFirstEdit: true }
			])
		}
		updateLayout()
	}, [children])

	const SingleNode = useMemo(
		() => (
			<div className='relative' ref={nodeRef} tabIndex={0}>
				<EditableNode generateNextSibling={generateNextSibling} generateChild={generateChild} node={node} />

				<MindEdge childNode={nodeRef} parentNode={parentRef} parentChildren={parentChildren} />
			</div>
		),
		[]
	)

	if (Array.isArray(children) && children.length > 0) {
		return (
			<div className='flex items-center' style={{ columnGap: distance }}>
				{SingleNode}
				<div className='flex flex-col items-start' style={{ rowGap: gap }}>
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
