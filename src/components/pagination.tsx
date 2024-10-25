import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react'

import { OutlineButton } from './outline-button'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  totalPagesCount: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  totalCount,
  totalPagesCount,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2">
      <span className="text-xs md:text-base">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center justify-between md:justify-start gap-4 md:gap-6">
        <div className="text-xs md:text-base">
          Página {pageIndex} de {totalPagesCount}
        </div>

        <div className="flex items-center gap-2">
          <OutlineButton
            onClick={() => onPageChange(1)}
            disabled={pageIndex === 1}
          >
            <CaretDoubleLeft className="w-3 h-3" />
            <span className="sr-only">Primeira página</span>
          </OutlineButton>
          <OutlineButton
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 1}
          >
            <CaretLeft className="w-3 h-3" />
            <span className="sr-only">Página anterior</span>
          </OutlineButton>
          <OutlineButton
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={totalPagesCount <= pageIndex}
          >
            <CaretRight className="w-3 h-3" />
            <span className="sr-only">Próxima página</span>
          </OutlineButton>
          <OutlineButton
            onClick={() => onPageChange(totalPagesCount)}
            disabled={totalPagesCount <= pageIndex}
          >
            <CaretDoubleRight className="w-3 h-3" />
            <span className="sr-only">Última página</span>
          </OutlineButton>
        </div>
      </div>
    </div>
  )
}
