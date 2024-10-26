import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { createContext, ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  getUserProfile,
  type GetUserProfileResponse,
} from '@/api/users/get-user-profile'
import { queryClient } from '@/lib/react-query'

import { Loader } from '@/components/loader'

const unauthenticatedRoutes = ['/', '/sign-up']

interface UserProfileContextType {
  userProfile?: GetUserProfileResponse | Record<string, never>
  isLoading: boolean
}

export const UserProfileContext = createContext({} as UserProfileContextType)

interface UserProfileProviderProps {
  children: ReactNode
}

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    retry: (failureCount, error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status
        const code = error.response?.data.code

        if (status === 401 && code === 'UNAUTHORIZED') {
          return false
        }
      }

      return failureCount <= 3
    },
  })

  useEffect(() => {
    if (location.pathname === '/sign-up' && userProfile?.id) {
      navigate('/', { replace: true })
    }

    if (isError && !unauthenticatedRoutes.includes(location.pathname)) {
      navigate('/', { replace: true })
      queryClient.setQueryData(['user-profile'], {})
    }
  }, [isError, location, navigate, userProfile])

  return (
    <UserProfileContext.Provider value={{ userProfile, isLoading }}>
      {isLoading ? (
        <Loader message="Carregando dados do usuário..." />
      ) : (
        children
      )}
    </UserProfileContext.Provider>
  )
}
