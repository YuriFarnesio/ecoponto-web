import { api } from '@/lib/axios'

export interface GetPointParams {
  id?: string
}

export interface GetPointResponse {
  point: {
    id: number
    image: string
    name: string
    email: string
    whatsapp: string
    latitude: string
    longitude: string
    city: string
    uf: string
    image_url: string
  }
  items: {
    id: number
    title: string
  }[]
}

export async function getPoint({ id }: GetPointParams) {
  const response = await api.get<GetPointResponse>(`/points/${id}`)

  return response.data
}
