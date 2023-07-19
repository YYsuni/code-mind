import CodeMind from './components/code-mind'

function App() {
	return (
		<>
			<header className='fixed top-4 left-4 flex text-xl font-semibold font-mono items-center'>
				<img src='/logo.svg' className='h-4' />
			</header>

			<CodeMind />
		</>
	)
}

export default App
