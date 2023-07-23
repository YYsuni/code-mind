import { createContext, useState } from 'react'
import { initialNode } from '../consts'
import MindContainer from './mind-container'
import { MindNode } from './mind-node'

export const MindContext = createContext({
	distance: 0,
	gap: 0,
	edgeType: 'line',
	layoutFlag: 0,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	updateLayout: () => {},
	defaultMaxWidth: 0,
	minWidth: 0
})

interface Props {
	distance?: number
	gap?: number
	edgeType?: string
	defaultMaxWidth?: number
	minWidth?: number
}

export default function CodeMind({
	distance = 36,
	gap = 16,
	edgeType = 'line',
	defaultMaxWidth = 400,
	minWidth = 100
}: Props) {
	const [layoutFlag, setLayoutFlag] = useState(0)

	return (
		<MindContext.Provider
			value={{
				distance,
				gap,
				edgeType,
				layoutFlag,
				updateLayout: () => setLayoutFlag(state => state + 1),
				defaultMaxWidth,
				minWidth
			}}>
			<MindContainer>
				<MindNode node={initialNode} />
			</MindContainer>
		</MindContext.Provider>
	)
}
