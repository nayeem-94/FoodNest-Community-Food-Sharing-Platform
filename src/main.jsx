import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Routerpath from './Routerpath/Routerpath'
import Authprovider from './pages/Provider/Authprovider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={Routerpath}> </RouterProvider>
    </Authprovider>
  </StrictMode>,
)
