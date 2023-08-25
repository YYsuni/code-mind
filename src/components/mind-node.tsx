import { Dispatch, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import MindEdge from './mind-edge'
import { MindContext } from './code-mind'
import EditableNode from './editable-node'
import { stateStore } from '../lib/save'
import { amendDistance } from '@/utils'

interface Props {
	index?: number
	parentID?: string
	node: MindNode
	parentRef?: NodeRef
	siblings?: MindNode[]
	setParentChildren?: Dispatch<MindNode[]>
}

export default function MindNode({ node, parentRef, siblings, setParentChildren, index, parentID }: Props) {
	const { distance, gap, updateLayout, saveFlag } = useContext(MindContext)

	const nodeRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<{
		getContent: () => string
		getType: () => NodeType
		getCode: () => string
		getStyle: () => React.CSSProperties
	}>(null)

	const [children, setChildren] = useState(node.children)

	const generateNextSibling = useCallback(() => {
		if (siblings && setParentChildren) {
			const nextIndex = (index || 0) + 1
			const nextNode: MindNode = {
				id: String(Date.now()),
				value: 'Example ' + (siblings.length + 1),
				isNew: true,
				isFirstEdit: true
			}
			siblings.splice(nextIndex, 0, nextNode)
			setParentChildren(siblings.slice())
			updateLayout()
		}
	}, [siblings, index])

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

	const deleteCurrent = useCallback(() => {
		if (siblings && setParentChildren) {
			siblings?.splice(index!, 1)
			setParentChildren(siblings?.slice())
			updateLayout()
		}
	}, [siblings, index])

	const SingleNode = useMemo(
		() => (
			<div className='relative' ref={nodeRef}>
				<EditableNode
					deleteCurrent={deleteCurrent}
					generateNextSibling={generateNextSibling}
					generateChild={generateChild}
					node={node}
					ref={contentRef}
				/>

				<MindEdge childNode={nodeRef} parentNode={parentRef} siblings={siblings} />
			</div>
		),
		[generateNextSibling, generateNextSibling, generateChild]
	)

	// Save feature: Push current state object to the stateStore.
	useEffect(() => {
		const currentNode: MindNode = {
			id: node.id,
			value: contentRef.current?.getContent() || '',
			parentID,
			type: contentRef.current?.getType() || 'text',
			style: contentRef.current?.getStyle()
		}
		if (currentNode.type === 'code') currentNode.code = contentRef.current?.getCode() || ''

		stateStore.current.push(currentNode)
	}, [saveFlag])

	const distance_amend = amendDistance(distance, children)

	if (Array.isArray(children) && children.length > 0) {
		return (
			<div className='flex items-center' style={{ columnGap: distance_amend }}>
				{SingleNode}
				<div className='flex flex-col items-start' style={{ rowGap: gap }}>
					{children.map((item, index) => (
						<MindNode
							parentID={node.id}
							key={item.id}
							index={index}
							node={item}
							parentRef={nodeRef}
							siblings={children}
							setParentChildren={setChildren}
						/>
					))}
				</div>
			</div>
		)
	}

	return SingleNode
}
