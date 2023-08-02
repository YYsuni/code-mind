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
}

declare type NodeRef = React.RefObject<HTMLDivElement>
declare type PropsWithChildren = React.PropsWithChildren
