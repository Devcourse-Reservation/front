import React from 'react'
import ReactDOM from 'react-dom/client' // React 18 이상
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Routers from './Routers' // ✅ "Router" → "Routers"로 변경

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routers /> {/* ✅ "Router" → "Routers"로 변경 */}
    </QueryClientProvider>
  </React.StrictMode>
)
