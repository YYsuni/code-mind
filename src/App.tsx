import CodeMind from './components/code-mind'
import GithubSVG from './svgs/github'
import { Toaster } from 'sonner'

function App() {
	return (
		<>
			<header className='fixed top-4 left-4 flex text-xl font-semibold z-10 font-mono items-center'>
				<img src='/logo.svg' className='h-4' />
			</header>

			<a href='https://github.com/YYsuni/code-mind' className='fixed top-4 right-4 z-10 p-1 text-#1' target='_blank'>
				<GithubSVG className='w-4 h-4' />
			</a>

			<CodeMind />

			<Toaster />
		</>
	)
}

export default App
