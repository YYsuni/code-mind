import { initialNode } from '../consts'
import MindContainer from './mind-container'
import { MindNode } from './mind-node'

export default function CodeMind() {
	return (
		<MindContainer>
			<MindNode node={initialNode} />
		</MindContainer>
	)
}
