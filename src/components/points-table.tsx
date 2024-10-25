import { Pen } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import type { PointData } from '@/api/points/list-points'

import { Tooltip } from './tooltip'

interface PointsTableProps {
  points?: PointData[]
  isLoading: boolean
}

export function PointsTable({ points, isLoading }: PointsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full caption-bottom">
        <thead className="[&_tr]:border-b [&_tr]:border-background">
          <tr>
            <th className="font-roboto text-sm md:text-base text-title font-bold text-left align-middle py-1 md:py-2" />
            <th className="font-roboto text-sm md:text-base text-title font-bold text-left align-middle border-l border-background py-1 md:py-2 pl-1">
              Nome
            </th>
            <th className="font-roboto text-sm md:text-base text-title font-bold text-left align-middle py-1 md:py-2">
              E-mail
            </th>
            <th className="font-roboto text-sm md:text-base text-title font-bold text-left align-middle py-1 md:py-2">
              WhatsApp
            </th>
            <th className="font-roboto text-sm md:text-base text-title font-bold text-left align-middle py-1 md:py-2">
              Cidade/UF
            </th>
            <th className="font-roboto text-sm md:text-base text-title font-bold text-left align-middle py-1 md:py-2">
              Itens
            </th>
          </tr>
        </thead>

        <tbody className="[&_tr:last-child]:border-0">
          {!!points && !isLoading
            ? points.map(({ point, items }) => (
                <tr
                  key={point.id}
                  className="hover:bg-desaturated border-b border-background transition-all duration-300"
                >
                  <td className="w-8 text-sm md:text-base text-black text-left align-middle whitespace-nowrap py-2 md:py-4 pr-1">
                    <div className="flex items-center gap-2">
                      <Tooltip text="Editar ponto de coleta">
                        <Link
                          to={`/update-point/${point.id}`}
                          className="bg-greenpeace hover:bg-ecogreen text-white rounded-lg p-1 transition-all duration-300"
                        >
                          <Pen className="w-4 h-4" />
                        </Link>
                      </Tooltip>
                    </div>
                  </td>
                  <td className="text-sm md:text-base text-black text-left align-middle border-l border-background whitespace-nowrap py-2 md:py-4 pl-1 pr-2">
                    {point.name}
                  </td>
                  <td className="text-sm md:text-base text-black text-left align-middle whitespace-nowrap py-2 md:py-4 pr-2">
                    {point.email}
                  </td>
                  <td className="text-sm md:text-base text-black text-left align-middle whitespace-nowrap py-2 md:py-4 pr-2">
                    {point.whatsapp}
                  </td>
                  <td className="text-sm md:text-base text-black text-left align-middle whitespace-nowrap py-2 md:py-4 pr-2">
                    {point.city}/{point.uf}
                  </td>
                  <td className="text-sm md:text-base text-black text-left align-middle whitespace-nowrap py-2 md:py-4">
                    {items.map((item) => item.title).join(', ')}
                  </td>
                </tr>
              ))
            : Array.from({ length: 10 }).map((_, i) => (
                <tr
                  key={i}
                  className="hover:bg-desaturated border-b border-background transition-all duration-300"
                >
                  <td className="text-black text-left align-middle py-2 md:py-4 pr-2">
                    <div className="w-full h-6 bg-placeholder rounded-md animate-pulse" />
                  </td>
                  <td className="text-black text-left align-middle py-2 md:py-4 pr-2">
                    <div className="w-full h-6 bg-placeholder rounded-md animate-pulse" />
                  </td>
                  <td className="text-black text-left align-middle py-2 md:py-4 pr-2">
                    <div className="w-full h-6 bg-placeholder rounded-md animate-pulse" />
                  </td>
                  <td className="text-black text-left align-middle py-2 md:py-4 pr-2">
                    <div className="w-full h-6 bg-placeholder rounded-md animate-pulse" />
                  </td>
                  <td className="text-black text-left align-middle py-2 md:py-4 pr-2">
                    <div className="w-full h-6 bg-placeholder rounded-md animate-pulse" />
                  </td>
                  <td className="w-8 text-black text-left align-middle py-2 md:py-4">
                    <div className="w-6 h-6 bg-placeholder rounded-md animate-pulse" />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
