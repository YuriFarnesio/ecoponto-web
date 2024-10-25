import { api } from '@/lib/axios'

export interface UpdatePointBody {
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

export async function updatePoint([id, payload]: [string, payload: FormData]) {
  await api.put(`/points/${id}`, payload)
}
