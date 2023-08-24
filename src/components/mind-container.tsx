import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { MAX_SCALE, MIN_SCALE, containerState, controls } from '@/share'
import { createUseGesture, dragAction, pinchAction, wheelAction } from '@use-gesture/react'
import Scene from '@/themes/sunset/scene'

const useGesture = createUseGesture([dragAction, pinchAction, wheelAction])

export default function MindContainer({ children }: PropsWithChildren) {
	const [springs, api] = useSpring(() => ({
		from: { x: containerState.x(), y: containerState.y(), scale: containerState.scale },
		config: { tension: 100, friction: 5, mass: 0.1 }
	}))

	// Initialize controls in share file
	useEffect(() => {
		controls.setScale = (s: number) => {
			containerState.scale = s
			api.start({ scale: s })
		}
		controls.clearOffset = () => {
			containerState.offsetX = 0
			containerState.offsetY = 0
			containerState.initialX = 0
			containerState.initialY = 0
			containerState.wheelX = 0
			containerState.wheelY = 0
			api.start({ x: 0, y: 0 })
		}
	}, [api])

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

				containerState.offsetX = offset[0]
				containerState.offsetY = offset[1]
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
			pinch: { scaleBounds: { min: MIN_SCALE, max: MAX_SCALE }, rubberband: true },
			drag: { pointer: { keys: false, buttons: 'ontouchstart' in window ? 1 : 4 } }
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
			id='mind-container'
			className='code-mind relative flex h-full w-full touch-none items-center justify-center overflow-hidden'>
			<div className='code-mind--center relative flex items-center justify-center'>
				<animated.div className='absolute flex items-center justify-between' style={springs}>
					<Scene />
				</animated.div>
				<animated.div className='absolute flex items-center justify-between' style={springs}>
					{children}
				</animated.div>
			</div>
		</div>
	)
}
