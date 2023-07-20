import { createContext } from 'react'
import { initialNode } from '../consts'
import MindContainer from './mind-container'
import { MindNode } from './mind-node'

export const MindContext = createContext({
	distance: 32,
	gap: 16,
	edgeType: 'line'
})

interface Props {
	distance?: number
	gap?: number
	edgeType?: string
}

export default function CodeMind({ distance = 32, gap = 8, edgeType = 'line' }: Props) {
	return (
		<MindContext.Provider value={{ distance, gap, edgeType }}>
			<MindContainer>
				<MindNode node={initialNode} />
			</MindContainer>
		</MindContext.Provider>
	)
}
