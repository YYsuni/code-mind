import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { MindContext } from './code-mind'

interface Props {
	parentNode?: NodeRef
	childNode: NodeRef
	parentChildren?: MindNode[]
}

export default function MindEdge({ parentNode, childNode, parentChildren }: Props) {
	const { distance } = useContext(MindContext)

	const [height, setHeight] = useState(0)

	useEffect(() => {
		if (parentNode?.current && childNode.current) {
			const { top: pTop, height: pheight } = parentNode.current.getBoundingClientRect()
			const { top: cTop, height: cHeight } = childNode.current.getBoundingClientRect()

			const height = pTop - cTop + (pheight - cHeight) / 2

			setHeight(height)
		}
	}, [parentChildren])

	const h = Math.abs(height)

	if (parentNode?.current)
		return (
			<svg
				className={clsx(
					'absolute left-0 -translate-x-full top-1/2 w-8 text-edge z-[-1]',
					height < 0 && '-scale-y-100 -translate-y-full'
				)}
				stroke='currentColor'
				viewBox={`0 0 ${distance} ${h}`}>
				<path d={`M0 ${h} L${distance} 0`} />
			</svg>
		)
	return null
}
