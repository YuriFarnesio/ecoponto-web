import { api } from '@/lib/axios'

export interface CreatePointBody {
  name: string
  email: string
  whatsapp: string
  latitude: string
  longitude: string
  city: string
  uf: string
  items: [number, ...number[]]
  image: File
}

export async function createPoint(payload: FormData) {
  await api.post('/points', payload)
}
