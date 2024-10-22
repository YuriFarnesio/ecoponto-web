import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode } from 'react'

import { getUserProfile } from '@/api/users/get-user-profile'

interface UserProfile {
  id: number
  name: string
  email: string
  created_at: Date
  updated_at: Date
}

interface UserProfileContextType {
  userProfile?: UserProfile
  isLoading: boolean
}

export const UserProfileContext = createContext({} as UserProfileContextType)

interface UserProfileProviderProps {
  children: ReactNode
}

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
  })

  return (
    <UserProfileContext.Provider value={{ userProfile, isLoading }}>
      {children}
    </UserProfileContext.Provider>
  )
}
