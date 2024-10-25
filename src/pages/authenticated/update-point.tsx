import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getCities } from '@/api/ibge/get-cities'
import { getUFs } from '@/api/ibge/get-ufs'
import { getItems } from '@/api/items/get-items'
import { getPoint } from '@/api/points/get-point'
import { updatePoint } from '@/api/points/update-point'
import { cn } from '@/lib/utils'
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from '@/utils/files'
import { phoneRegex } from '@/utils/regex'

import { Button } from '@/components/button'
import { Dropzone } from '@/components/dropzone'
import { Input } from '@/components/input'
import { Loader } from '@/components/loader'
import { Map } from '@/components/map'
import { MaskedInput } from '@/components/masked-input'
import { Select } from '@/components/select'

const updatePointForm = z.object({
  name: z.string().min(1, 'Campo obrigatório.'),
  email: z.string().min(1, 'Campo obrigatório.').email('E-mail inválido!'),
  whatsapp: z.string().min(1, 'Campo obrigatório.').regex(phoneRegex, {
    message: 'Telefone inválido!',
  }),
  positions: z.tuple([z.number(), z.number()]),
  city: z.string().min(1, 'Campo obrigatório.'),
  uf: z.string().min(1, 'Campo obrigatório.'),
  items: z.number().array().nonempty({
    message: 'Selecione pelo menos um item.',
  }),
  image: z
    .custom<File>()
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      'O arquivo deve ter menos que 3MB.',
    )
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
      'O arquivo deve ser PNG, JPG ou JPEG.',
    ),
})

type UpdatePointForm = z.infer<typeof updatePointForm>

export function UpdatePoint() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [selectedUf, setSelectedUf] = useState<string>('')

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePointForm>({
    resolver: zodResolver(updatePointForm),
    defaultValues: {
      positions: [0, 0],
      uf: '',
      city: '',
      items: [],
    },
  })

  const positions = watch('positions')

  const { data: point, isLoading: isLoadingPoint } = useQuery({
    queryKey: ['point', id],
    queryFn: async () => {
      const data = await getPoint({ id })

      reset({
        name: data.point.name,
        email: data.point.email,
        whatsapp: data.point.whatsapp,
        positions: [Number(data.point.latitude), Number(data.point.longitude)],
        city: data.point.city,
        uf: data.point.uf,
        items: data.items.map((item) => item.id),
      })

      return data
    },
    enabled: !!id,
  })

  const { data: items, isLoading: isLoadingItems } = useQuery({
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

  const { mutateAsync: mutateUpdatePoint } = useMutation({
    mutationFn: updatePoint,
  })

  function handleChangeSelect(
    value: string,
    onChange: (value: string) => void,
  ) {
    const newSelectedUf = ufs?.find((uf) => uf.value === value)?.label
    const ufAcronym = newSelectedUf?.split(' - ')?.[1]

    onChange(ufAcronym ?? '')
    setSelectedUf(value)
    setValue('city', '')
  }

  async function handleCreatePoint(data: UpdatePointForm) {
    try {
      if (!id) {
        return
      }

      const payload = new FormData()

      payload.append('name', data.name)
      payload.append('email', data.email)
      payload.append('whatsapp', data.whatsapp)
      payload.append('uf', data.uf)
      payload.append('city', data.city)
      payload.append('latitude', String(data.positions[0]))
      payload.append('longitude', String(data.positions[1]))
      payload.append('items', data.items.join(','))

      if (data.image) {
        payload.append('image', data.image)
      }

      await mutateUpdatePoint([id, payload])

      toast.success('Ponto de coleta atualizado com sucesso.')
      navigate('/points')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message
        toast.error(errorMessage || 'Erro ao atualizar ponto de coleta.')
      } else {
        toast.error('Erro ao atualizar ponto de coleta.')
      }
    }
  }

  useEffect(() => {
    const pointUf = ufs?.find((uf) => {
      const ufAcronym = uf.label?.split(' - ')?.[1]
      return ufAcronym === point?.point.uf
    })

    if (pointUf) {
      setSelectedUf(pointUf.value)
    }
  }, [point, ufs])

  if (isLoadingPoint || isLoadingItems || isLoadingUfs) {
    const messageText = isLoadingPoint
      ? 'dados do ponto'
      : isLoadingItems
        ? 'itens'
        : 'estados'

    return <Loader message={`Carregando os ${messageText}...`} />
  }

  return (
    <>
      <Helmet title="Edição de ponto" />

      <main className="w-full max-w-7xl py-6 xl:py-8 px-6 md:px-10 xl:px-20 mx-auto">
        <form
          onSubmit={handleSubmit(handleCreatePoint)}
          className="w-full flex flex-col gap-4 md:gap-8 bg-white rounded-lg p-6 md:p-12 lg:p-16 mx-auto"
        >
          <h1 className="font-ubuntu text-2xl md:text-4xl text-title font-bold">
            Edição do
            <br />
            ponto de coleta
          </h1>

          <Dropzone
            errorMessage={errors.image?.message}
            onFileUploaded={(file) => setValue('image', file)}
            defaultFileUrl={point?.point.image_url}
          />

          <fieldset className="flex flex-col gap-6">
            <legend className="mb-2 md:mb-6">
              <h2 className="font-ubuntu text-lg md:text-3xl text-title font-bold">
                Dados
              </h2>
            </legend>

            <div className="w-full grid md:grid-cols-2 gap-4 md:gap-6">
              <Input
                id="name"
                label="Nome da entidade"
                placeholder="Digite o nome da entidade"
                errorMessage={errors.name?.message}
                required
                {...register('name')}
              />

              <Input
                id="email"
                type="email"
                label="E-mail"
                placeholder="Digite o e-mail da entidade"
                errorMessage={errors.email?.message}
                required
                {...register('email')}
              />
            </div>

            <div className="w-full grid md:grid-cols-2 gap-4 md:gap-6">
              <MaskedInput
                id="whatsapp"
                label="WhatsApp"
                placeholder="Digite o telefone da entidade"
                mask="+55 __ _____-____"
                replacement={{ _: /\d/ }}
                errorMessage={errors.whatsapp?.message}
                showMask
                required
                {...register('whatsapp')}
              />
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-6 relative">
            <legend className="w-full flex items-center justify-between mb-2 md:mb-6">
              <h2 className="font-ubuntu text-lg md:text-3xl text-title font-bold">
                Endereço
              </h2>
              <span className="text-xs md:text-base text-texts">
                Selecione o endereço no mapa
              </span>
            </legend>

            <Map
              positions={positions}
              onChangePositions={(value) => setValue('positions', value)}
              isEditing
              {...(point && {
                initialPositions: [
                  Number(point.point.latitude),
                  Number(point.point.longitude),
                ],
              })}
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
                      handleChangeSelect(value, onChange)
                    }
                    items={ufs || []}
                    errorMessage={errors.uf?.message}
                    required
                  />
                )}
              />

              {cities && (
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
              )}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-6 relative">
            <legend className="w-full flex items-center justify-between mb-2 md:mb-6">
              <h2 className="font-ubuntu text-lg md:text-3xl text-title font-bold">
                Itens de coleta
              </h2>
              <span className="text-xs md:text-base text-texts">
                Selecione um ou mais itens abaixo
              </span>
            </legend>

            <Controller
              name="items"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="w-full grid grid-cols-3 gap-2 md:gap-4">
                    {items?.map((item) => {
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
          </fieldset>

          <Button type="submit" isLoading={isSubmitting} className="self-end">
            Editar ponto de coleta
          </Button>
        </form>
      </main>
    </>
  )
}
