import { ReactComponent as BrushSVG } from '@/svgs/brush.svg'
import { ReactComponent as ZoomInSVG } from '@/svgs/zoom-in.svg'
import { ReactComponent as ZoomOutSVG } from '@/svgs/zoom-out.svg'
import { ReactComponent as CenterSVG } from '@/svgs/center.svg'
import { toast } from 'sonner'
import { MAX_SCALE, MIN_SCALE, containerState, controls } from '@/share'

export default function MindControl() {
	return (
		<aside className='fixed right-4 top-1/2 flex -translate-y-1/2 flex-col gap-3'>
			<button
				onClick={() => {
					toast('soon')
				}}
				className='rounded-md bg-white/80 p-2 backdrop-blur'>
				<BrushSVG />
			</button>
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
