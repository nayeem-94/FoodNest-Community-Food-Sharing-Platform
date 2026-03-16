import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Routerpath from './Routerpath/Routerpath'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={ Routerpath }> </RouterProvider>
  </StrictMode>,
)
