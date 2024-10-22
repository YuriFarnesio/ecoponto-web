import axios from 'axios'

export interface GetUFsResponse {
  id: number
  nome: string
  sigla: string
}

export async function getUFs() {
  const response = await axios.get<GetUFsResponse[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  )

  const sortedList = response.data.sort((a, b) => (a.nome < b.nome ? -1 : 1))

  return sortedList?.map((uf) => {
    return {
      value: String(uf.id),
      label: `${uf.nome} - ${uf.sigla}`,
    }
  })
}
