import { api } from '@/lib/axios'

export interface UpdateUserBody {
  name: string
  email: string
  password: string
}

export interface UpdateUserResponse {
  id: number
  name: string
  email: string
  created_at: Date
  updated_at: Date
}

export async function updateUser({ name, email, password }: UpdateUserBody) {
  const response = await api.put<UpdateUserResponse>('/users', {
    name,
    email,
    password,
  })

  return response.data
}
