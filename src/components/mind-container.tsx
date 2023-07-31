import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { containerState } from '@/share'
import { createUseGesture, dragAction, pinchAction, wheelAction } from '@use-gesture/react'

const useGesture = createUseGesture([dragAction, pinchAction, wheelAction])

export default function MindContainer({ children }: PropsWithChildren) {
	const [springs, api] = useSpring(() => ({
		from: { x: 0, y: 0, scale: 1 },
		config: { tension: 100, friction: 5, mass: 0.1 }
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
				containerState.scale = s
			},
			onDrag: ({ offset, target, cancel, pinching }) => {
				if (pinching) return cancel()

				containerState._x = offset[0]
				containerState._y = offset[1]
				api.set({ x: containerState.x(), y: containerState.y() })
			},
			onWheel: ({ offset, pinching, event }) => {
				if (!pinching && !event.ctrlKey) {
					containerState.wheelX = offset[0]
					containerState.wheelY = offset[1]
					api.set({ x: containerState.x(), y: containerState.y() })
				} else {
					offset[0] = containerState.wheelX
					offset[1] = containerState.wheelY
				}
			}
		},
		{
			target: containerRef,
			pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
			drag: { pointer: { keys: false, buttons: 4 } }
		}
	)

	// Grabbing cursor
	useEffect(() => {
		const mousedownHandler = (event: MouseEvent) => {
			if ((event.button === 1 || event.buttons === 4) && containerRef.current) {
				containerRef.current.style.cursor = 'grabbing'
			}
		}
		const mouseupHandler = (event: MouseEvent) => {
			if ((event.button === 1 || event.buttons === 4) && containerRef.current) {
				containerRef.current.style.cursor = 'auto'
			}
		}

		containerRef.current?.addEventListener('mousedown', mousedownHandler)
		containerRef.current?.addEventListener('mouseup', mouseupHandler)

		return () => {
			containerRef.current?.removeEventListener('mousedown', mousedownHandler)
			containerRef.current?.removeEventListener('mouseup', mouseupHandler)
		}
	}, [])

	return (
		<div
			ref={containerRef}
			className='relative w-full h-full code-mind flex justify-center items-center touch-none overflow-hidden'>
			<div className='code-mind--center relative flex justify-center items-center'>
				<animated.div className='absolute' style={springs}>
					{children}
				</animated.div>
			</div>
		</div>
	)
}
