//import { useState } from 'react'
import './App.css'
import IdeaInput from './components/input'
import Headerpart from './components/header'
function App() {
  return (
    <>
      <div>
        <Headerpart/>
        <h1>Validate your Idea instantly</h1>
        <p>You’ve got a big idea. FoundrCheck helps you find out if the world’s ready for it — with smart, AI-powered startup analysis that goes deep.</p>        
      </div>
      <IdeaInput/>
    </>
  )
}

export default App
