import { api } from '@/lib/axios'

export interface GetUserProfileResponse {
  id: number
  name: string
  email: string
  created_at: Date
  updated_at: Date
}

export async function getUserProfile() {
  const response = await api.get<GetUserProfileResponse>('/users/profile')

  return response.data
}
