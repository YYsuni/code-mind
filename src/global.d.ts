declare module '*.svg' {
	const src: string
	export default src
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
}

declare type PropsWithChildren = React.PropsWithChildren

declare type NodeElement = HTMLDivElement & {
	reactStyle?: React.CSSProperties
	dispatchStyle?: React.Dispatch<{
		type: 'setWidth' | 'setMinWidth' | 'setMaxWidth' | 'setHeight' | 'setBackgroundColor'
		payload: string | number
	}>
}
declare type NodeRef = React.RefObject<NodeElement>

declare type LineType = 'straight' | 'straight-with-handle' | 'right-angle' | 'bezier'
declare type NodeType = 'text' | 'code'

declare type MindNode = {
	id: string
	parentID?: string
	value: string
	children?: MindNode[]
	isNew?: boolean
	isFirstEdit?: boolean
	type?: NodeType
	code?: string
	style?: React.CSSProperties
}
