import IdeaInput from './components/input'
import Headerpart from './components/header'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 text-slate-100">
      <Headerpart/>

      <div className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl items-center px-6 py-12">
        <div className="w-full rounded-3xl border border-cyan-400/20 bg-slate-900/40 p-8 text-center shadow-2xl backdrop-blur md:p-12">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-200">
            AI startup validator
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Validate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">Idea</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-slate-300 sm:text-lg">
            FoundrCheck helps you discover if the world is ready for your concept with market, competitor, trend, and strategy insights in one flow.
          </p>
          <div className="mt-8">
            <IdeaInput/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
