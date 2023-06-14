import ReactFlow, { Controls, Background, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'

const initialNodes = [
	{ id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
	{ id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
	{ id: '3', position: { x: 200, y: 100 }, data: { label: '3' } }
]
const initialEdges = [
	{ id: '1-2', source: '1', target: '2' },
	{ id: '2-3', source: '1', target: '3' }
]

export default function CodeMind() {
	return (
		<main className='w-[100vw] h-[100vh]'>
			<ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
				<Controls />
				<Background />
				<MiniMap />
			</ReactFlow>
		</main>
	)
}
