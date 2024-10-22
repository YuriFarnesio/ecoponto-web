import axios from 'axios'

export interface GetCitiesParams {
  uf: string
}

export interface GetCitiesResponse {
  id: number
  nome: string
}

export async function getCities({ uf }: GetCitiesParams) {
  const response = await axios.get<GetCitiesResponse[]>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
  )

  const sortedList = response.data.sort((a, b) => (a.nome < b.nome ? -1 : 1))

  return sortedList?.map((city) => {
    return {
      value: city.nome,
      label: city.nome,
    }
  })
}
