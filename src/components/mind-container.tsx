import { useEffect, useRef, useState } from 'react'

import { useGesture } from '@use-gesture/react'

export default function MindContainer({ children }: PropsWithChildren) {
	const [scale, setScale] = useState(1)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handler = (e: Event) => e.preventDefault()
		document.addEventListener('gesturestart', handler)
		document.addEventListener('gesturechange', handler)
		document.addEventListener('gestureend', handler)

		return () => {
			document.removeEventListener('gesturestart', handler)
			document.removeEventListener('gesturechange', handler)
			document.removeEventListener('gestureend', handler)
		}
	}, [])

	useGesture(
		{
			onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
				setScale(s)
			}
		},
		{
			target: containerRef,
			pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true }
		}
	)

	return (
		<div className='relative w-full h-full code-mind flex justify-center items-center' ref={containerRef}>
			<div className='code-mind--center relative flex justify-center items-center'>
				<span className='w-2 h-2 bg-red-50'></span>

				<div className='absolute' style={{ transform: `scale(${scale})` }}>
					{children}
				</div>
			</div>
		</div>
	)
}
