import './monacoWorker'

import { createContext, useEffect, useState } from 'react'
import MindContainer from './mind-container'
import MindNode from './mind-node'
import { stateStore } from '../lib/save'
import MindControl from './mind-control'

export const MindContext = createContext({
	distance: 0,
	gap: 0,
	edgeType: 'line',
	layoutFlag: 0,
	updateLayout: () => {},
	maxWidth: 0,
	minWidth: 0,
	saveFlag: 0
})

interface Props {
	distance?: number
	gap?: number
	edgeType?: string
	maxWidth?: number
	minWidth?: number
}

export default function CodeMind({
	distance = 36,
	gap = 16,
	edgeType = 'line',
	maxWidth = 400,
	minWidth = 100
}: Props) {
	const [layoutFlag, setLayoutFlag] = useState(0)
	const [saveFlag, setSaveFlag] = useState(0)

	// Initialize
	useEffect(() => {
		// Initialize save handle
		stateStore.saveHandle = () => {
			setSaveFlag(state => ++state)
		}
	}, [])

	return (
		<MindContext.Provider
			value={{
				distance,
				gap,
				edgeType,
				layoutFlag,
				updateLayout: () => setLayoutFlag(state => state + 1),
				maxWidth,
				minWidth,
				saveFlag
			}}>
			<MindContainer>
				<MindNode node={stateStore.local} />
			</MindContainer>
			<MindControl />
		</MindContext.Provider>
	)
}
