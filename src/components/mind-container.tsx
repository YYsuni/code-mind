import { createContext, useEffect, useRef, useState } from 'react'

import { useGesture } from '@use-gesture/react'

export const ContainerContext = createContext({
	scale: 1
})

export default function MindContainer({ children }: PropsWithChildren) {
	const [scale, setScale] = useState(1)
	const [offset_drag, setOffset_drag] = useState([0, 0])
	const [offset_wheel, setOffset_wheel] = useState([0, 0])
	const containerRef = useRef<HTMLDivElement>(null)

	// Prevent default gesture event
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
			onPinch: ({ offset: [s, a] }) => {
				setScale(s)
			},
			onDrag: ({ offset }) => {
				setOffset_drag(offset)
			},
			onWheel: ({ offset }) => {
				setOffset_wheel(offset.map(item => -item))
			}
		},
		{
			target: containerRef,
			pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
			drag: { pointer: { keys: false } }
		}
	)

	return (
		<ContainerContext.Provider value={{ scale }}>
			<div
				className='relative w-full h-full code-mind flex justify-center items-center cursor-grab touch-none overflow-hidden'
				ref={containerRef}>
				<div className='code-mind--center relative flex justify-center items-center'>
					<div
						className='absolute'
						style={{
							scale: String(scale),
							translate: `${offset_drag[0] + offset_wheel[0]}px ${offset_drag[1] + offset_wheel[1]}px`
						}}>
						{children}
					</div>
				</div>
			</div>
		</ContainerContext.Provider>
	)
}
