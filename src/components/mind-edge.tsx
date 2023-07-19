import { useEffect, useState } from 'react'
import clsx from 'clsx'

interface Props {
	parentNode?: NodeRef
	childNode: NodeRef
}

export default function MindEdge({ parentNode, childNode }: Props) {
	const [height, setHeight] = useState(0)

	useEffect(() => {
		if (parentNode?.current && childNode.current) {
			const { top: pTop } = parentNode.current.getBoundingClientRect()
			const { top: cTop } = childNode.current.getBoundingClientRect()

			const height = pTop - cTop

			setHeight(height)
		}
	}, [parentNode?.current])

	const h = Math.abs(height)

	if (parentNode?.current)
		return (
			<svg
				className={clsx(
					'absolute left-[-1px] -translate-x-full top-1/2 w-8 text-edge',
					height < 0 && '-scale-y-100 -translate-y-full'
				)}
				stroke='currentColor'
				viewBox={`0 0 32 ${h}`}>
				<path d={`M0 ${h} L32 0`} />
			</svg>
		)
	return null
}
