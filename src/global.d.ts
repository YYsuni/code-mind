declare type MindNode = {
	id: string
	value: string
	children?: MindNode[]
	isNew?: boolean
}

declare type NodeRef = React.RefObject<HTMLDivElement>
declare type PropsWithChildren = React.PropsWithChildren
