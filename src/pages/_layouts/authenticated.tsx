import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { UserProfileProvider } from '@/contexts/user-profile'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'
import { cn } from '@/lib/utils'

export function AuthenticatedLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const isHomepage = location.pathname === '/'

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (location.pathname !== '/') {
          if (isAxiosError(error)) {
            const status = error.response?.status
            const code = error.response?.data.code

            if (status === 401 && code === 'UNAUTHORIZED') {
              navigate('/', { replace: true })
              queryClient.cancelQueries()
              queryClient.setQueryData(['user-profile'], {})
            } else {
              throw error
            }
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [location.pathname, navigate])

  return (
    <UserProfileProvider>
      <div
        className={cn(
          'w-full bg-background',
          isHomepage
            ? 'h-screen relative overflow-hidden'
            : 'min-h-screen flex flex-col',
        )}
      >
        <Header />

        <Outlet />
      </div>
    </UserProfileProvider>
  )
}
