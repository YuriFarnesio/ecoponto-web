import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateUser, type UpdateUserResponse } from '@/api/users/update-user'
import { UserProfileContext } from '@/contexts/user-profile'
import { queryClient } from '@/lib/react-query'
import { passwordRegex } from '@/utils/regex'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

const UpdateUserForm = z
  .object({
    name: z.string().min(1, 'Campo obrigatório.'),
    email: z.string().min(1, 'Campo obrigatório.').email('E-mail inválido!'),
    password: z.string().min(1, 'Campo obrigatório.').regex(passwordRegex, {
      message: 'Senha inválida!',
    }),
    confirmPassword: z.string().min(1, 'Campo obrigatório.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem!',
    path: ['confirmPassword'],
  })

type UpdateUserForm = z.infer<typeof UpdateUserForm>

export function UpdateUser() {
  const navigate = useNavigate()

  const { userProfile } = useContext(UserProfileContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(UpdateUserForm),
    defaultValues: {
      name: userProfile?.name ?? '',
      email: userProfile?.email ?? '',
    },
  })

  const { mutateAsync: mutateUpdateUser } = useMutation({
    mutationFn: updateUser,
  })

  async function handleUpdateUser(data: UpdateUserForm) {
    try {
      const user = await mutateUpdateUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      toast.success('Perfil atualizado com sucesso.')
      queryClient.setQueryData<UpdateUserResponse>(['user-profile'], user)

      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message
        toast.error(errorMessage || 'Erro ao atualizar perfil.')
      } else {
        toast.error('Erro ao atualizar perfil')
      }
    }
  }

  return (
    <>
      <Helmet title="Edição de perfil" />

      <main className="w-full max-w-7xl py-6 xl:py-8 px-6 md:px-10 xl:px-20 mx-auto">
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="w-full flex flex-col gap-4 md:gap-8 bg-white rounded-lg p-6 md:p-12 lg:p-16 mx-auto"
        >
          <h1 className="font-ubuntu text-2xl md:text-4xl text-title font-bold">
            Edição do perfil
          </h1>

          <fieldset className="flex flex-col gap-6">
            <legend className="mb-2 md:mb-6">
              <h2 className="font-ubuntu text-lg md:text-3xl text-title font-bold">
                Dados
              </h2>
            </legend>

            <div className="w-full grid md:grid-cols-2 gap-4 md:gap-6">
              <Input
                id="name"
                label="Nome do usuário"
                placeholder="Digite seu nome completo"
                errorMessage={errors.name?.message}
                required
                {...register('name')}
              />

              <Input
                id="email"
                type="email"
                label="E-mail do usuário"
                placeholder="Digite seu e-mail"
                errorMessage={errors.email?.message}
                required
                {...register('email')}
              />
            </div>

            <div className="w-full grid md:grid-cols-2 gap-4 md:gap-6">
              <Input
                id="password"
                type="password"
                label="Senha do usuário"
                placeholder="********"
                tooltipText={
                  <p>
                    A senha deve conter pelo menos:
                    <br />- 8 dígitos
                    <br />- 1 letra maiúscula
                    <br />- 1 letra minúscula
                    <br />- 1 número
                    <br />- 1 caracter especial
                  </p>
                }
                errorMessage={errors.password?.message}
                required
                {...register('password')}
              />

              <Input
                id="confirmPassword"
                type="password"
                label="Confirmação de senha"
                placeholder="********"
                tooltipText="A senhas devem ser idênticas."
                errorMessage={errors.confirmPassword?.message}
                required
                {...register('confirmPassword')}
              />
            </div>
          </fieldset>

          <Button type="submit" isLoading={isSubmitting} className="self-end">
            Editar perfil
          </Button>
        </form>
      </main>
    </>
  )
}
