import { api } from '@/lib/axios'

export interface AuthBody {
  email: string
  password: string
}

export interface AuthResponse {
  id: number
  name: string
  email: string
  created_at: Date
  updated_at: Date
}

export async function auth({ email, password }: AuthBody) {
  const response = await api.post<AuthResponse>('/users/auth', {
    email,
    password,
  })

  return response.data
}
