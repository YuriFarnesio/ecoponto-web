import { api } from '@/lib/axios'

export interface CreateUserBody {
  name: string
  email: string
  password: string
}

export interface CreateUserResponse {
  id: number
  name: string
  email: string
  created_at: Date
  updated_at: Date
}

export async function createUser({ name, email, password }: CreateUserBody) {
  const result = await api.post<CreateUserResponse>('/users', {
    name,
    email,
    password,
  })

  return result.data
}
