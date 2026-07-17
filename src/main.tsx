import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ConfigProvider } from 'antd'
import './index.css';

createRoot(document.getElementById('root')!).render(
<StrictMode>
  <ConfigProvider theme={{
    token:{
      colorPrimary:'rgba(54, 5, 122, 0.88)',
      colorPrimaryActive:'rgba(71, 42, 175, 0.66)',
      colorLink:'rgba(48, 37, 146, 0.86)'
    }
  }}>
  <RouterProvider router={router}/>

  </ConfigProvider>
  </StrictMode>,
)
