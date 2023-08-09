import CodeMind from './components/code-mind'
import { Toaster } from 'sonner'

function App() {
	return (
		<>
			<header className='fixed left-4 top-4 z-10 flex items-center font-mono text-xl font-semibold'>
				<img src='/favicon.svg' className='mr-3 h-5' />
				<img src='/logo.svg' className='h-4' />
			</header>

			<CodeMind />

			<Toaster />
		</>
	)
}

export default App
