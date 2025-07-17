//import { useState } from 'react'
import './App.css'
import IdeaInput from './components/input'
import Headerpart from './components/header'

function App() {
  return (
    <>
      <div className="">
        <Headerpart/>
        <h1 className="text-3xl font-bold text-center mt-8 text-white-800">Validate your Idea instantly</h1>
        <p className="text-lg text-center mt-4 px-6 text-gray-600 max-w-2xl mx-auto">You've got a big idea. FoundrCheck helps you find out if the world's ready for it — with smart, AI-powered startup analysis that goes deep.</p>        
      </div>
      <IdeaInput/>
    </>
  )
}

export default App
