//import { useState } from 'react'
import './styles.css';
import IdeaInput from './components/input'
import Headerpart from './components/header'

function App() {
  return (
    <div id="root" className="bg-gradient-to-r from-blue-900 via-purple-900 to-black text-white min-h-screen flex flex-col items-center justify-center">
      <Headerpart/>
      
      <div className="text-center max-w-4xl px-6">
        <h1 className="text-5xl font-extrabold mb-6">
          Validate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Idea</span>
        </h1>
        <p className="text-lg mb-8">
          FoundrCheck helps you discover if the world's ready for your innovative idea — with smart, AI-powered startup analysis that goes deep.
        </p>
        <IdeaInput/>
      </div>
    </div>
  );
}

export default App
