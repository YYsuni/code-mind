import CodeMind from './components/code-mind'
import GithubSVG from './svgs/github'
import { Toaster } from 'sonner'

function App() {
	return (
		<>
			<header className='fixed left-4 top-4 z-10 flex items-center font-mono text-xl font-semibold'>
				<img src='/logo.svg' className='h-4' />
			</header>

			<a href='https://github.com/YYsuni/code-mind' className='fixed right-4 top-4 z-10 p-1 text-#1' target='_blank'>
				<GithubSVG className='h-4 w-4' />
			</a>

			<CodeMind />

			<Toaster />
		</>
	)
}

export default App
