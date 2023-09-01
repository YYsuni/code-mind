import { ReactComponent as BrushSVG } from '@/svgs/brush.svg'
import { ReactComponent as ZoomInSVG } from '@/svgs/zoom-in.svg'
import { ReactComponent as ZoomOutSVG } from '@/svgs/zoom-out.svg'
import { ReactComponent as CenterSVG } from '@/svgs/center.svg'
import { ReactComponent as BoldSVG } from '@/svgs/bold.svg'
import { ReactComponent as ItalicSVG } from '@/svgs/italic.svg'
import { ReactComponent as StrikeThroughSVG } from '@/svgs/strike-through.svg'
import { containerState, controls } from '@/share'
import { useContext, useEffect, useRef, useState } from 'react'
import { useSelectState } from '@/hooks/useSelectState'
import { MindContext } from './code-mind'
import { MAX_SCALE, MIN_SCALE } from '@/consts'

export default function MindControl() {
	return (
		<aside className='fixed right-4 top-1/2 flex -translate-y-1/2 flex-col gap-3'>
			<Brush />
			<button
				onClick={() => {
					let newScale = containerState.scale * 1.2
					if (newScale > MAX_SCALE) newScale = MAX_SCALE

					controls.setScale(newScale)
				}}
				className='rounded-md bg-white/80 p-2 backdrop-blur'>
				<ZoomInSVG />
			</button>
			<button
				onClick={() => {
					let newScale = containerState.scale * 0.8
					if (newScale < MIN_SCALE) newScale = MIN_SCALE

					controls.setScale(newScale)
				}}
				className='rounded-md bg-white/80 p-2 backdrop-blur'>
				<ZoomOutSVG />
			</button>
			<button
				onClick={() => {
					controls.setScale(1)
					controls.clearOffset()
				}}
				className='rounded-md bg-white/80 p-2 backdrop-blur'>
				<CenterSVG />
			</button>
		</aside>
	)
}

function Brush() {
	const { maxWidth, minWidth } = useContext(MindContext)

	const [show, setShow] = useState(false)
	const [_, updateState] = useState(0)
	const ref = useRef<HTMLDivElement>(null)

	const { current } = useSelectState()

	useEffect(() => {
		if (current && show) {
			if (ref.current && current.reactStyle) {
				const minWidthElement = ref.current.querySelector('input[name="min-width"]') as HTMLInputElement
				if (minWidthElement)
					if ('minWidth' in current.reactStyle) minWidthElement.value = String(current.reactStyle.minWidth)
					else minWidthElement.value = ''

				const maxWidthElement = ref.current.querySelector('input[name="max-width"]') as HTMLInputElement
				if (maxWidthElement)
					if ('maxWidth' in current.reactStyle) maxWidthElement.value = String(current.reactStyle.maxWidth)
					else maxWidthElement.value = ''

				const widthElement = ref.current.querySelector('input[name="width"]') as HTMLInputElement
				if (widthElement)
					if ('width' in current.reactStyle) widthElement.value = String(current.reactStyle.width)
					else widthElement.value = ''

				const heightElement = ref.current.querySelector('input[name="height"]') as HTMLInputElement
				if (heightElement)
					if ('height' in current.reactStyle) heightElement.value = String(current.reactStyle.height)
					else heightElement.value = ''
			}

			const observer = new ResizeObserver(() => updateState(state => ++state))
			observer.observe(current, { box: 'border-box' })

			return () => observer.disconnect()
		}
	}, [current, show])

	const normalChangeHanlder =
		(action: 'setMinWidth' | 'setMaxWidth' | 'setWidth' | 'setHeight') =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (current?.dispatchStyle) {
				const target = event.target as HTMLInputElement

				if (!target.value) {
					current.dispatchStyle({ type: action, payload: '' })
				} else {
					const value = +target.value

					if (!Object.is(value, NaN)) current.dispatchStyle({ type: action, payload: value })
				}
			}
		}

	return (
		<>
			<span className=' relative'>
				<button
					onClick={() => {
						setShow(state => !state)
					}}
					className='rounded-md bg-white/80 p-2 backdrop-blur'>
					<BrushSVG />
				</button>

				{show &&
					(current ? (
						<div
							ref={ref}
							className='absolute right-12 top-0 space-y-2 rounded-lg bg-white/80 p-3 text-xs backdrop-blur'
							style={{ width: 200 }}>
							<div>
								<label className='group relative flex h-7 items-center rounded border border-transparent hover:border-black/10'>
									<span className='absolute left-1'>MinWidth</span>
									<input
										onChange={normalChangeHanlder('setMinWidth')}
										name='min-width'
										placeholder={String(minWidth)}
										type='text'
										className='h-full bg-transparent py-0.5'
										style={{ width: 176, paddingLeft: 72, paddingRight: 60 }}
									/>
									<button
										className='absolute right-0 top-0 h-full border-l border-transparent text-center hover:bg-black/5 group-hover:border-black/10'
										style={{ width: 48 }}
										onClick={() => {
											if (current?.dispatchStyle) current.dispatchStyle({ type: 'setMinWidth', payload: '' })
											;(ref.current!.querySelector('input[name="min-width"]') as HTMLInputElement).value = ''
										}}>
										reset
									</button>
								</label>
								<label className='group relative flex h-7 items-center rounded border border-transparent hover:border-black/10'>
									<span className='absolute left-1'>MaxWidth</span>
									<input
										onChange={normalChangeHanlder('setMaxWidth')}
										name='max-width'
										placeholder={String(maxWidth)}
										type='text'
										className='h-full bg-transparent py-0.5'
										style={{ width: 176, paddingLeft: 72, paddingRight: 60 }}
									/>
									<button
										onClick={() => {
											if (current?.dispatchStyle) current.dispatchStyle({ type: 'setMaxWidth', payload: '' })
											;(ref.current!.querySelector('input[name="max-width"]') as HTMLInputElement).value = ''
										}}
										className='absolute right-0 top-0 h-full border-l border-transparent text-center hover:bg-black/5 group-hover:border-black/10'
										style={{ width: 48 }}>
										reset
									</button>
								</label>
								<label className='group relative flex h-7 items-center rounded border border-transparent hover:border-black/10'>
									<span className='absolute left-1'>Width</span>
									<input
										name='width'
										onChange={normalChangeHanlder('setWidth')}
										placeholder={current?.offsetWidth.toString() || 'null'}
										type='text'
										className='h-full bg-transparent py-0.5'
										style={{ width: 176, paddingLeft: 72, paddingRight: 60 }}
									/>
									<button
										onClick={() => {
											if (current?.dispatchStyle) current.dispatchStyle({ type: 'setWidth', payload: '' })
											;(ref.current!.querySelector('input[name="width"]') as HTMLInputElement).value = ''
										}}
										className='absolute right-0 top-0 h-full border-l border-transparent text-center hover:bg-black/5 group-hover:border-black/10'
										style={{ width: 48 }}>
										reset
									</button>
								</label>

								<label className='group relative flex h-7 items-center rounded border border-transparent hover:border-black/10'>
									<span className='absolute left-1'>Height</span>
									<input
										onChange={normalChangeHanlder('setHeight')}
										name='height'
										placeholder={current?.offsetHeight.toString() || 'null'}
										type='text'
										className='h-full bg-transparent py-0.5'
										style={{ width: 176, paddingLeft: 72, paddingRight: 60 }}
									/>
									<button
										onClick={() => {
											if (current?.dispatchStyle) current.dispatchStyle({ type: 'setHeight', payload: '' })
											;(ref.current!.querySelector('input[name="height"]') as HTMLInputElement).value = ''
										}}
										className='absolute right-0 top-0 h-full border-l border-transparent text-center hover:bg-black/5 group-hover:border-black/10'
										style={{ width: 48 }}>
										reset
									</button>
								</label>
							</div>

							<div className='border-t border-black/5' />

							<div className='flex h-7 items-center justify-between gap-x-2 pl-1'>
								<span>Fill</span>

								<button className='rounded py-1 text-center hover:bg-black/5' style={{ width: 48 }}>
									reset
								</button>
							</div>
							<div className='group flex h-7 items-center border border-transparent pl-1 hover:border-black/10'>
								<div className='mr-1 h-4 w-4 border' style={{ backgroundColor: 'white' }}></div>
								<input
									placeholder='FFFFFF'
									type='text'
									className='h-full border-l border-r border-transparent bg-transparent px-1 py-0.5 group-hover:border-black/10'
									style={{ width: 102 }}
								/>
								<input
									type='text'
									placeholder='80%'
									className='h-full bg-transparent px-1 py-0.5 text-center'
									style={{ width: 48 }}
								/>
							</div>

							<div className='border-t border-black/5' />

							<div className='flex h-7 items-center justify-between gap-x-2 pl-1'>
								<span>Text</span>

								<button className='rounded py-1 text-center hover:bg-black/5' style={{ width: 48 }}>
									reset
								</button>
							</div>
							<div className='group flex h-7 items-center border border-transparent pl-1 hover:border-black/10'>
								<div className='mr-1 h-4 w-4' style={{ backgroundColor: 'pink' }}></div>
								<input
									placeholder='FED2CB'
									type='text'
									className='h-full border-l border-r border-transparent bg-transparent px-1 py-0.5 group-hover:border-black/10'
									style={{ width: 102 }}
								/>
								<input
									type='text'
									placeholder='100%'
									className='h-full bg-transparent px-1 py-0.5 text-center'
									style={{ width: 48 }}
								/>
							</div>

							<div className='flex h-7 items-center gap-x-1'>
								<button className='rounded p-1 text-text/60 hover:bg-black/5'>
									<BoldSVG className='h-4 w-4' />
								</button>
								<button className='rounded p-1 text-text/60 hover:bg-black/5'>
									<ItalicSVG className='h-4 w-4' />
								</button>
								<button className='rounded p-1 text-text/60 hover:bg-black/5'>
									<StrikeThroughSVG className='h-4 w-4' />
								</button>

								<input className='h-full bg-transparent px-1 py-0.5' placeholder='14' style={{ width: 92 }} />
							</div>
						</div>
					) : (
						<div
							className='absolute right-12 top-0 space-y-2 rounded-lg bg-white/80 p-3 text-xs backdrop-blur'
							style={{ width: 200 }}>
							<h2 className='text-center text-lg'>Null</h2>
							<p className='text-center'>Please select the node</p>
						</div>
					))}
			</span>
		</>
	)
}
