import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { MindContext } from './code-mind'
import { containerState } from '@/share'
import { amendDistance } from '@/utils'

interface Props {
	parentNode?: NodeRef
	childNode: NodeRef
	siblings?: MindNode[]
	type?: LineType
}

export default function MindEdge({ parentNode, childNode, siblings, type = 'bezier' }: Props) {
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
	}, [siblings, layoutFlag])

	const h = Math.abs(height)

	const distance_amend = amendDistance(distance, siblings)

	if (parentNode?.current)
		if (h > 2) {
			switch (type) {
				case 'bezier':
					return (
						<svg
							className={clsx(
								'absolute left-0 top-1/2 -translate-x-full text-edge ',
								height < 0 && '-translate-y-full -scale-y-100'
							)}
							stroke='currentColor'
							viewBox={`0 0 ${distance_amend} ${h}`}
							style={{ width: distance_amend, height: h }}
							strokeWidth='2'
							fill='none'>
							<path d={`M0 ${h} C${distance_amend / 5} ${h} ${(distance_amend * 4) / 5} 0  ${distance_amend} 0`} />
						</svg>
					)
				case 'right-angle':
					return (
						<div
							className={clsx(
								'absolute left-0 top-1/2 -translate-x-full border-l-2 border-t-2 border-edge',
								height < 0 && '-translate-y-full -scale-y-100'
							)}
							style={{ width: (distance_amend * 4) / 5, height: h }}>
							<div
								className='absolute bottom-[-1px] left-[-2px] -translate-x-full border-t-2 border-edge'
								style={{ width: distance_amend / 5 }}
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
							viewBox={`0 0 ${distance_amend} ${h}`}
							style={{ width: distance_amend, height: h }}
							strokeWidth='2'
							fill='none'>
							<path d={`M${distance_amend / 5} ${h} L${distance_amend} 0`} />
							<path d={`M0 ${h} L${distance_amend / 5} ${h}`} />
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
							viewBox={`0 0 ${distance_amend} ${h}`}
							style={{ width: distance_amend, height: h }}
							fill='none'>
							<path d={`M0 ${h} L${distance_amend} 0`} strokeWidth='2' />
						</svg>
					)
			}
		} else
			return (
				<div
					className='absolute left-0 top-1/2 -translate-x-full border-t-2 border-edge'
					style={{ width: distance_amend }}
				/>
			)

	return null
}
