import { zodResolver } from '@hookform/resolvers/zod'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { auth } from '@/api/users/auth'
import type { GetUserProfileResponse } from '@/api/users/get-user-profile'
import { queryClient } from '@/lib/react-query'
import { passwordRegex } from '@/utils/regex'

import { Button } from '../button'
import { Input } from '../input'

const signInForm = z.object({
  email: z.string().min(1, 'Campo obrigatório.').email('E-mail inválido!'),
  password: z.string().min(1, 'Campo obrigatório.').regex(passwordRegex, {
    message: 'Senha inválida!',
  }),
})

type SignInForm = z.infer<typeof signInForm>

export function DropdownSignInForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: auth,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      const user = await authenticate({
        email: data.email,
        password: data.password,
      })

      toast.success('Login realizado com sucesso.')

      queryClient.setQueryData<GetUserProfileResponse>(['user-profile'], user)
      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message
        toast.error(errorMessage || 'Erro ao fazer login.')
      } else {
        toast.error('Erro ao fazer login')
      }
    }
  }

  return (
    <>
      <DropdownMenuPrimitive.Label className="flex flex-col rounded-lg outline-none overflow-hidden p-2">
        <p className="line-clamp-1">Faça seu login</p>
        <Link
          to="/sign-up"
          className="w-fit flex items-center text-sm text-texts hover:text-title font-medium hover:underline line-clamp-1 transition-all duration-300"
        >
          ou cadastre-se
        </Link>
      </DropdownMenuPrimitive.Label>

      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col rounded-lg overflow-hidden p-2"
      >
        <fieldset className="flex flex-col gap-4">
          <Input
            id="email"
            type="email"
            variant="dropdown"
            label="E-mail do usuário"
            placeholder="Digite seu e-mail"
            errorMessage={errors.email?.message}
            required
            autoFocus
            {...register('email')}
          />

          <Input
            id="password"
            type="password"
            variant="dropdown"
            label="Senha do usuário"
            placeholder="********"
            errorMessage={errors.password?.message}
            required
            {...register('password')}
          />
        </fieldset>

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full text-sm py-2 px-4 mt-4"
        >
          Acesse seu perfil
        </Button>
      </form>
    </>
  )
}
