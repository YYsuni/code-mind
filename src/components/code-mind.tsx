import { MindNode } from './mind-node'

const exampleNodeTree: MindNode = {
	id: '0',
	value: 'CodeMind',
	children: [
		{ id: '1-0', value: 'Example 1' },
		{ id: '1-1', value: 'Example 2' }
	]
}

export default function CodeMind() {
	return (
		<div className='relative w-full h-full code-mind flex justify-center items-center'>
			<div className='code-mind--center relative flex justify-center items-center'>
				<span className='w-2 h-2 bg-red-50'></span>

				<div className='absolute'>
					<MindNode node={exampleNodeTree} />
				</div>
			</div>
		</div>
	)
}
