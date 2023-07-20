import { createContext, useState } from 'react'
import { initialNode } from '../consts'
import MindContainer from './mind-container'
import { MindNode } from './mind-node'

export const MindContext = createContext({
	distance: 32,
	gap: 16,
	edgeType: 'line',
	layoutFlag: 0,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	updateLayout: () => {}
})

interface Props {
	distance?: number
	gap?: number
	edgeType?: string
}

export default function CodeMind({ distance = 36, gap = 16, edgeType = 'line' }: Props) {
	const [layoutFlag, setLayoutFlag] = useState(0)

	return (
		<MindContext.Provider
			value={{ distance, gap, edgeType, layoutFlag, updateLayout: () => setLayoutFlag(layoutFlag + 1) }}>
			<MindContainer>
				<MindNode node={initialNode} />
			</MindContainer>
		</MindContext.Provider>
	)
}
