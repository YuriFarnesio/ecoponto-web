import { zodResolver } from '@hookform/resolvers/zod'
import { CaretDown, Plus, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getCities } from '@/api/ibge/get-cities'
import { getUFs } from '@/api/ibge/get-ufs'
import { getItems } from '@/api/items/get-items'
import { listPoints } from '@/api/points/list-points'
import { cn } from '@/lib/utils'

import { Button } from '@/components/button'
import { Loader } from '@/components/loader'
import { Pagination } from '@/components/pagination'
import { PointsTable } from '@/components/points-table'
import { Select } from '@/components/select'

const listPointsForm = z.object({
  city: z.string(),
  uf: z.string(),
  items: z.number().array(),
})

type ListPointsForm = z.infer<typeof listPointsForm>

export function ListPoints() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const [selectedUf, setSelectedUf] = useState<string>('')

  const page = z.coerce.number().parse(searchParams.get('page') ?? '1')
  const uf = searchParams.get('uf') || ''
  const city = searchParams.get('city') || ''
  const items = z
    .string()
    .transform((val) => (val ? val.split(',').map(Number) : []))
    .parse(searchParams.get('items') ?? '')

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ListPointsForm>({
    resolver: zodResolver(listPointsForm),
    defaultValues: { uf, city, items },
  })

  const { data: points, isLoading: isLoadingPoints } = useQuery({
    queryKey: ['points', page, uf, city, items],
    queryFn: () =>
      listPoints({
        page,
        uf,
        city,
        items,
      }),
  })

  const { data: itemsList, isLoading: isLoadingItems } = useQuery({
    queryKey: ['items'],
    queryFn: getItems,
    staleTime: Infinity,
  })

  const { data: ufs, isLoading: isLoadingUfs } = useQuery({
    queryKey: ['ufs'],
    queryFn: getUFs,
    staleTime: Infinity,
  })

  const { data: cities } = useQuery({
    queryKey: ['cities', selectedUf],
    queryFn: () => getCities({ uf: selectedUf }),
    enabled: !!selectedUf,
    staleTime: Infinity,
  })

  function handleChangeUfSelect(
    value: string,
    onChange: (value: string) => void,
  ) {
    const newSelectedUf = ufs?.find((uf) => uf.value === value)?.label
    const ufAcronym = newSelectedUf?.split(' - ')?.[1]

    onChange(ufAcronym ?? '')
    setSelectedUf(value)
    setValue('city', '')
  }

  function handleFilter({ uf, city, items }: ListPointsForm) {
    setSearchParams((state) => {
      if (uf) {
        state.set('uf', uf)
      } else {
        state.delete('uf')
      }

      if (city) {
        state.set('city', city)
      } else {
        state.delete('city')
      }

      if (items.length) {
        state.set('items', items.toString())
      } else {
        state.delete('items')
      }

      state.set('page', '1')

      return state
    })

    setFiltersOpen(false)
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('uf')
      state.delete('city')
      state.delete('items')
      state.set('page', '1')

      return state
    })

    setSelectedUf('')
    reset({
      city: '',
      uf: '',
      items: [],
    })

    setFiltersOpen(false)
  }

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', pageIndex.toString())

      return state
    })
  }

  useEffect(() => {
    if (!uf) {
      return
    }

    const pointUf = ufs?.find((ufMap) => {
      const ufAcronym = ufMap.label?.split(' - ')?.[1]
      return ufAcronym === uf
    })

    if (pointUf) {
      setSelectedUf(pointUf.value)
    }

    if (city) {
      setValue('city', city)
    }
  }, [city, setValue, uf, ufs])

  if (isLoadingItems || isLoadingUfs) {
    const messageText = isLoadingItems ? 'itens' : 'estados'

    return <Loader message={`Carregando os ${messageText}...`} />
  }

  return (
    <>
      <Helmet title="Listagem de pontos" />

      <main className="w-full max-w-7xl py-6 xl:py-8 px-6 md:px-10 xl:px-20 mx-auto">
        <div className="w-full flex flex-col gap-4 md:gap-8 bg-white rounded-lg p-6 md:p-12 lg:p-16 mx-auto transition-all duration-300">
          <div className="flex flex-row items-center md:items-start justify-between gap-2">
            <h1 className="font-ubuntu text-2xl md:text-4xl text-title font-bold">
              Listagem dos
              <br />
              pontos de coleta
            </h1>

            <Link to="/create-point" className="w-fit">
              <Button LeftIcon={Plus} className="hidden md:flex">
                Cadastrar ponto de coleta
              </Button>

              <Button
                onClick={() => handleClearFilters()}
                className="md:hidden p-2 md:p-4"
              >
                <Plus className="w-4 h-4 md:w-6 md:h-6" />
              </Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit(handleFilter)}>
            <fieldset
              className={cn(
                'grid grid-rows-[0fr] transition-all duration-300',
                filtersOpen && 'grid-rows-[1fr]',
              )}
            >
              <legend
                onClick={() => setFiltersOpen((prevState) => !prevState)}
                className={cn(
                  'w-full flex items-center justify-between gap-2 md:gap-4 cursor-pointer transition-all duration-300',
                  filtersOpen && 'mb-2 md:mb-6',
                )}
              >
                <h2 className="font-ubuntu text-lg md:text-3xl text-title font-bold">
                  Filtros
                </h2>
                <CaretDown
                  className={cn(
                    'text-lg md:text-3xl text-title transition-all duration-300',
                    filtersOpen && 'rotate-180',
                  )}
                />
              </legend>

              <div
                className={cn(
                  'flex flex-col gap-6 scale-y-100 visible transition-all origin-top duration-300',
                  !filtersOpen && 'overflow-hidden scale-y-0 invisible',
                )}
              >
                <Controller
                  name="items"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col gap-1 md:gap-2">
                      <div className="w-full grid grid-cols-3 gap-2 md:gap-4">
                        {itemsList?.map((item) => {
                          const isSelected = value.includes(item.id)

                          return (
                            <div
                              key={item.id}
                              onClick={() =>
                                onChange(
                                  isSelected
                                    ? value.filter(
                                        (selected) => selected !== item.id,
                                      )
                                    : [...value, item.id],
                                )
                              }
                              className={cn(
                                'w-full h-24 md:h-48 flex flex-col items-center justify-between bg-desaturated gap-2 md:gap-4 rounded-lg cursor-pointer py-4 px-2 md:p-8',
                                isSelected &&
                                  'outline outline-2 outline-greenpeace bg-gradient-to-t from-[#E1FAEC] to-white',
                              )}
                            >
                              <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-8 h-8 md:w-16 md:h-16 pointer-events-none select-none"
                              />
                              <p className="text-sm md:text-base text-title text-center">
                                {item.title}
                              </p>
                            </div>
                          )
                        })}
                      </div>

                      {!!errors.items?.message && (
                        <span className="text-xs leading-tight text-red-500">
                          {errors.items.message}
                        </span>
                      )}
                    </div>
                  )}
                />

                <div className="w-full grid md:grid-cols-2 gap-4 md:gap-6">
                  <Controller
                    name="uf"
                    control={control}
                    render={({ field: { name, onChange } }) => (
                      <Select
                        name={name}
                        label="Estado (UF)"
                        placeholder="Selecione um estado"
                        value={selectedUf}
                        onValueChange={(value) =>
                          handleChangeUfSelect(value, onChange)
                        }
                        items={ufs || []}
                        errorMessage={errors.uf?.message}
                        required
                      />
                    )}
                  />

                  <Controller
                    name="city"
                    control={control}
                    render={({ field: { name, onChange, value } }) => (
                      <Select
                        name={name}
                        label="Cidade"
                        placeholder="Selecione uma cidade"
                        value={value}
                        onValueChange={onChange}
                        items={cities || []}
                        errorMessage={errors.city?.message}
                        required
                      />
                    )}
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    onClick={() => handleClearFilters()}
                    className="bg-danger enabled:hover:bg-dangerHovered p-2 md:p-4"
                  >
                    <Trash className="w-4 h-4 md:w-6 md:h-6" />
                  </Button>

                  <Button type="submit">Aplicar filtros</Button>
                </div>
              </div>
            </fieldset>
          </form>

          <h2 className="font-ubuntu text-lg md:text-3xl text-title font-bold">
            Pontos de coleta
          </h2>

          <div className="flex flex-col gap-2 md:gap-4">
            <PointsTable points={points?.data} isLoading={isLoadingPoints} />

            {!!points?.pagination && (
              <Pagination
                pageIndex={points.pagination.currentPage}
                totalCount={points.pagination.totalItems}
                totalPagesCount={points.pagination.totalPages}
                onPageChange={handlePaginate}
              />
            )}
          </div>
        </div>
      </main>
    </>
  )
}
