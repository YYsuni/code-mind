import { Dispatch, useRef, useState } from 'react'
import MindEdge from './mind-edge'

interface Props {
	index?: number
	node: MindNode
	parentRef?: NodeRef
	parentChildren?: MindNode[]
	setParentChildren?: Dispatch<MindNode[]>
}

export function MindNode({ node, parentRef, parentChildren, setParentChildren, index }: Props) {
	const nodeRef = useRef<HTMLDivElement>(null)
	const [children, setChildren] = useState(node.children)

	const SingleNode = (
		<div
			onKeyDown={event => {
				if (event.key === 'Enter' && parentChildren && setParentChildren) {
					parentChildren.splice((index || 0) + 1, 0, {
						id: String(Date.now()),
						value: 'Example ' + (parentChildren.length + 1)
					})
					setParentChildren(parentChildren.slice())
				} else if (event.key === 'Tab') {
					event.preventDefault()

					if (!Array.isArray(children)) {
						setChildren([{ id: String(Date.now()), value: 'Example 1' }])
					} else {
						setChildren([...children, { id: String(Date.now()), value: 'Example ' + (children.length + 1) }])
					}
				}
			}}
			ref={nodeRef}
			className='w-max relative max-w-[200px] border py-2 px-4 focus:outline-primary focus:outline'
			tabIndex={0}>
			{node.value}

			<MindEdge childNode={nodeRef} parentNode={parentRef!} parentChildren={parentChildren} />
		</div>
	)

	if (Array.isArray(children) && children.length > 0) {
		return (
			<div className='flex gap-x-8 items-center'>
				{SingleNode}
				<div className='space-y-4'>
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
