import { createContext, useEffect, useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'

import { useGesture } from '@use-gesture/react'
import { currentState } from '../utils'

// export const ContainerContext = createContext({})

export default function MindContainer({ children }: PropsWithChildren) {
	const [springs, api] = useSpring(() => ({
		from: { scale: 1, x: 0, y: 0 },
		config: { tension: 50, friction: 5, mass: 0.1 }
	}))

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
			onPinch: ({ offset: [s] }) => {
				api.start({ scale: s })
				currentState.scale = s
			},
			onDrag: ({ offset, target, cancel }) => {
				if (target instanceof HTMLDivElement && target.id.startsWith('mind-node')) cancel()

				api.set({ x: offset[0], y: offset[1] })
			}
		},
		{
			target: containerRef,
			pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true, modifierKey: null },
			drag: { pointer: { keys: false } }
		}
	)

	return (
		<div
			ref={containerRef}
			className='relative w-full h-full code-mind flex justify-center items-center cursor-grab touch-none overflow-hidden'>
			<div className='code-mind--center relative flex justify-center items-center'>
				<animated.div className='absolute' style={springs}>
					{children}
				</animated.div>
			</div>
		</div>
	)
}
