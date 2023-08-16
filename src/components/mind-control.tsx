import { ReactComponent as BrushSVG } from '@/svgs/brush.svg'
import { ReactComponent as ZoomInSVG } from '@/svgs/zoom-in.svg'
import { ReactComponent as ZoomOutSVG } from '@/svgs/zoom-out.svg'
import { ReactComponent as CenterSVG } from '@/svgs/center.svg'
import { MAX_SCALE, MIN_SCALE, containerState, controls } from '@/share'
import { useState } from 'react'

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
	const [show, setShow] = useState(false)

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

				{show && (
					<div
						className='absolute right-12 top-0 space-y-2 bg-white/80 p-3 text-xs backdrop-blur'
						style={{ width: 200 }}>
						<div className='flex items-center gap-x-2'>
							<span className='' style={{ width: 50 }}>
								Width
							</span>
							<input type='text' className='flex-1 px-1 py-0.5' style={{ width: 60 }} />
							<button className='border border-transparent px-1 py-0.5 hover:border-black/10'>reset</button>
						</div>
						<div className='flex items-center gap-x-2'>
							<span className='' style={{ width: 50 }}>
								Height
							</span>
							<input type='text' className='flex-1 px-1 py-0.5' style={{ width: 60 }} />
							<button className='border border-transparent px-1 py-0.5 hover:border-black/10'>reset</button>
						</div>

						<div className=' border-t border-black/5' />

						<div className='flex items-center justify-between gap-x-2'>
							<span className='' style={{ width: 50 }}>
								Fill
							</span>

							<button className='border border-transparent px-1 py-0.5 hover:border-black/10'>reset</button>
						</div>
						<div className='flex items-center gap-x-2'>
							<div className='h-4 w-4' style={{ backgroundColor: 'pink' }}></div>
							<input type='text' value='FED2CB' className='px-1 py-0.5' style={{ width: 60 }} />
							<input type='text' value='100%' className='px-1 py-0.5' style={{ width: 36 }} />
						</div>

						<div className=' border-t border-black/5' />

						<div className='flex items-center justify-between gap-x-2'>
							<span className='' style={{ width: 50 }}>
								Text
							</span>

							<button className='border border-transparent px-1 py-0.5 hover:border-black/10'>reset</button>
						</div>
						<div className='flex items-center gap-x-2'>
							<div className='h-4 w-4' style={{ backgroundColor: 'pink' }}></div>
							<input type='text' value='FED2CB' className='px-1 py-0.5' style={{ width: 60 }} />
							<input type='text' value='100%' className='px-1 py-0.5' style={{ width: 36 }} />
						</div>
					</div>
				)}
			</span>
		</>
	)
}
