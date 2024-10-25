import { MagnifyingGlass, Plus, SignOut, User } from '@phosphor-icons/react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { signOut } from '@/api/users/sign-out'

interface DropdownProfileProps {
  name: string
  email: string
}

export function DropdownProfile({ name, email }: DropdownProfileProps) {
  const { mutateAsync: signOutUser } = useMutation({
    mutationFn: signOut,
  })

  async function handleSignOut() {
    try {
      await signOutUser()

      window.location.reload()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message
        toast.error(errorMessage || 'Erro ao sair.')
      } else {
        toast.error('Erro ao sair')
      }
    }
  }

  return (
    <>
      <DropdownMenuPrimitive.Label className="flex flex-col rounded-lg outline-none overflow-hidden p-2">
        <p className="line-clamp-1">{name}</p>
        <span className="text-sm text-texts line-clamp-1">{email}</span>
      </DropdownMenuPrimitive.Label>

      <DropdownMenuPrimitive.Item asChild>
        <Link
          to="/points"
          className="flex items-center justify-between focus:bg-desaturated active:bg-greenpeace gap-2 active:text-white rounded-lg outline-none overflow-hidden p-2 transition-all duration-300"
        >
          <p className="line-clamp-1">Encontrar ponto de coleta</p>
          <MagnifyingGlass className="min-w-4 w-4 min-h-4 h-4" />
        </Link>
      </DropdownMenuPrimitive.Item>

      <DropdownMenuPrimitive.Item asChild>
        <Link
          to="/create-point"
          className="flex items-center justify-between focus:bg-desaturated active:bg-greenpeace gap-2 active:text-white rounded-lg outline-none overflow-hidden p-2 transition-all duration-300"
        >
          <p className="line-clamp-1">Cadastrar ponto de coleta</p>
          <Plus className="min-w-4 w-4 min-h-4 h-4" />
        </Link>
      </DropdownMenuPrimitive.Item>

      <DropdownMenuPrimitive.Item asChild>
        <Link
          to="/update-user"
          className="flex items-center justify-between focus:bg-desaturated active:bg-greenpeace gap-2 active:text-white rounded-lg outline-none overflow-hidden p-2 transition-all duration-300"
        >
          <p className="line-clamp-1">Editar Perfil</p>
          <User className="min-w-4 w-4 min-h-4 h-4" />
        </Link>
      </DropdownMenuPrimitive.Item>

      <DropdownMenuPrimitive.Item asChild>
        <button
          onClick={handleSignOut}
          className="flex items-center justify-between focus:bg-desaturated active:bg-greenpeace gap-2 active:text-white rounded-lg outline-none overflow-hidden p-2 transition-all duration-300"
        >
          <p className="line-clamp-1">Sair</p>
          <SignOut className="min-w-4 w-4 min-h-4 h-4" />
        </button>
      </DropdownMenuPrimitive.Item>
    </>
  )
}
