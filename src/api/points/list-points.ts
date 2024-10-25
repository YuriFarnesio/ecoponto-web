import { api } from '@/lib/axios'

export interface GetPointParams {
  page?: number
  city?: string
  uf?: string
  items?: number[]
}

export interface PointData {
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

export interface ListPointsResponse {
  data: PointData[]
  pagination: {
    totalItems: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

export async function listPoints({
  page = 1,
  city,
  uf,
  items,
}: GetPointParams) {
  const response = await api.get<ListPointsResponse>(`/points`, {
    params: {
      page,
      limit: 10,
      city,
      uf,
      items,
    },
  })

  return response.data
}
