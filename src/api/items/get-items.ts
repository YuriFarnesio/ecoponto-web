import { api } from '@/lib/axios'

export interface GetItemsResponse {
  id: number
  title: string
  image_url: string
}

export async function getItems() {
  const response = await api.get<GetItemsResponse[]>('/items')

  return response.data
}
