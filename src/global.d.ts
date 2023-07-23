declare type MindNode = {
	id: string
	parentID?: string
	value: string
	children?: MindNode[]
	isNew?: boolean
	isFirstEdit?: boolean
}

declare type NodeRef = React.RefObject<HTMLDivElement>
declare type PropsWithChildren = React.PropsWithChildren
