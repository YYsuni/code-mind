import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { MindContext } from './code-mind'
import { containerState } from '@/share'

type LineType = 'straight' | 'straight-with-handle' | 'right-angle' | 'bezier'

interface Props {
	parentNode?: NodeRef
	childNode: NodeRef
	parentChildren?: MindNode[]
	type?: LineType
}

export default function MindEdge({ parentNode, childNode, parentChildren, type = 'bezier' }: Props) {
	const { distance, layoutFlag } = useContext(MindContext)

	const [height, setHeight] = useState(0)

	useEffect(() => {
		if (parentNode?.current && childNode.current) {
			const { top: pTop, height: pheight } = parentNode.current.getBoundingClientRect()
			const { top: cTop, height: cHeight } = childNode.current.getBoundingClientRect()

			let height = pTop - cTop + (pheight - cHeight) / 2
			height /= containerState.scale

			setHeight(height)
		}
	}, [parentChildren, layoutFlag])

	const h = Math.abs(height)

	if (parentNode?.current)
		if (height) {
			switch (type) {
				case 'bezier':
					return (
						<svg
							className={clsx(
								'absolute left-0 top-1/2 -translate-x-full text-edge ',
								height < 0 && '-translate-y-full -scale-y-100'
							)}
							stroke='currentColor'
							viewBox={`0 0 ${distance} ${h}`}
							style={{ width: distance, height: h }}
							strokeWidth='2'
							fill='none'
						>
							<path d={`M0 ${h} C${distance / 5} ${h} ${(distance * 4) / 5} 0  ${distance} 0`} />
						</svg>
					)
				case 'right-angle':
					return (
						<div
							className={clsx(
								'absolute left-0 top-1/2 -translate-x-full border-l-2 border-t-2 border-edge',
								height < 0 && '-translate-y-full -scale-y-100'
							)}
							style={{ width: (distance * 4) / 5, height: h }}
						>
							<div
								className='absolute bottom-[-1px] left-[-2px] -translate-x-full border-t-2 border-edge'
								style={{ width: distance / 5 }}
							/>
						</div>
					)
				case 'straight-with-handle':
					return (
						<svg
							className={clsx(
								'absolute left-0 top-1/2 -translate-x-full text-edge ',
								height < 0 && '-translate-y-full -scale-y-100'
							)}
							stroke='currentColor'
							viewBox={`0 0 ${distance} ${h}`}
							style={{ width: distance, height: h }}
							strokeWidth='2'
							fill='none'
						>
							<path d={`M${distance / 5} ${h} L${distance} 0`} />
							<path d={`M0 ${h} L${distance / 5} ${h}`} />
						</svg>
					)
				case 'straight':
				default:
					return (
						<svg
							className={clsx(
								'absolute left-0 top-1/2 -translate-x-full text-edge ',
								height < 0 && '-translate-y-full -scale-y-100'
							)}
							stroke='currentColor'
							viewBox={`0 0 ${distance} ${h}`}
							style={{ width: distance, height: h }}
							fill='none'
						>
							<path d={`M0 ${h} L${distance} 0`} strokeWidth='2' />
						</svg>
					)
			}
		} else
			return (
				<div className='absolute left-0 top-1/2 -translate-x-full border-t-2 border-edge' style={{ width: distance }} />
			)
	return null
}
