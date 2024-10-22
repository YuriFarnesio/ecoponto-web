import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { UserProfileProvider } from '@/contexts/user-profile'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

export function AuthenticatedLayout() {
  const location = useLocation()
  const navigate = useNavigate()

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
      <Outlet />
    </UserProfileProvider>
  )
}
