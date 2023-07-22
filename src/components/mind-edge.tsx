import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { MindContext } from './code-mind'
import { currentState } from '../utils'

interface Props {
	parentNode?: NodeRef
	childNode: NodeRef
	parentChildren?: MindNode[]
}

export default function MindEdge({ parentNode, childNode, parentChildren }: Props) {
	const { distance, layoutFlag } = useContext(MindContext)

	const [height, setHeight] = useState(0)

	useEffect(() => {
		if (parentNode?.current && childNode.current) {
			const { top: pTop, height: pheight } = parentNode.current.getBoundingClientRect()
			const { top: cTop, height: cHeight } = childNode.current.getBoundingClientRect()

			let height = pTop - cTop + (pheight - cHeight) / 2
			height /= currentState.scale

			setHeight(height)
		}
	}, [parentChildren, layoutFlag])

	const h = Math.abs(height)

	if (parentNode?.current)
		if (height)
			return (
				<svg
					className={clsx(
						'absolute left-0 -translate-x-full top-1/2 text-edge',
						height < 0 && '-scale-y-100 -translate-y-full'
					)}
					stroke='currentColor'
					viewBox={`0 0 ${distance} ${h}`}
					style={{ width: distance, height: h }}>
					<path d={`M0 ${h} L${distance} 0`} strokeWidth='2' />
				</svg>
			)
		else
			return (
				<div className='border-t-2 border-edge absolute left-0 -translate-x-full top-1/2' style={{ width: distance }} />
			)
	return null
}
