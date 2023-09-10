export default function ColorPicker() {
	return (
		<div className='group flex h-7 items-center border border-transparent pl-1 hover:border-black/10'>
			<div className='mr-1 h-4 w-4 border' style={{ backgroundColor: 'white' }}></div>
			<input
				placeholder='FFFFFF'
				type='text'
				className='h-full border-l border-r border-transparent bg-transparent px-1 py-0.5 group-hover:border-black/10'
				style={{ width: 102 }}
			/>
			<input
				type='text'
				placeholder='80%'
				className='h-full bg-transparent px-1 py-0.5 text-center'
				style={{ width: 48 }}
			/>
		</div>
	)
}
