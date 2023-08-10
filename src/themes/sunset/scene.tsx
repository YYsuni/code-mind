import { ReactComponent as SunSVG } from './sun.svg'
import { ReactComponent as Goose1SVG } from './goose-1.svg'
import { ReactComponent as Goose2SVG } from './goose-2.svg'
import src_shallowWave from './wave-shallow.svg'
import src_deepWave from './wave-deep.svg'
import { ReactComponent as IsletSVG } from './islet.svg'

export default function Scene() {
	return (
		<div className='pointer-events-none absolute z-[-1]'>
			<SunSVG className=' absolute' style={{ left: -500, top: -300 }} />
			<Goose1SVG className='absolute' style={{ left: -620, top: -320 }} />
			<Goose2SVG className=' absolute' style={{ left: -520, top: -360 }} />

			<div
				className='absolute'
				style={{ translate: '-50% 0', top: 800, backgroundColor: '#FDE2C5', width: 40000, height: 10000 }}>
				<div
					className='absolute w-full'
					style={{
						top: -200,
						backgroundImage: `url('${src_shallowWave}')`,
						backgroundRepeat: 'repeat-x',
						height: 204
					}}></div>
			</div>
			<div
				className='absolute'
				style={{ translate: '-50% 0', top: 1600, backgroundColor: '#FEA595', width: 40000, height: 10000 }}>
				<div
					className='absolute w-full'
					style={{
						top: -200,
						backgroundImage: `url('${src_deepWave}')`,
						backgroundRepeat: 'repeat-x',
						height: 204
					}}></div>
			</div>

			<IsletSVG className='absolute' style={{ bottom: -900, left: 600, height: 800, opacity: 0.8 }} />
		</div>
	)
}
