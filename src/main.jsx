import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Loading from './components/loading.jsx'
import { MessageProvider } from './context/MessageContext'
import Result from './components/result.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element: <App/>,
  },
  {
    path:"/loading",
    element:<Loading/>
  },
  {
    path:"/result",
    element:<Result/>
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MessageProvider>
      <RouterProvider router={router} />
    </MessageProvider>
  </StrictMode>,
)
