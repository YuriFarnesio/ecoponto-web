import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { queryClient } from '@/lib/react-query'

import { router } from './routes'

import './global.css'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | EcoPonto" />

      <Toaster closeButton richColors />

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}
