import { User } from '@phosphor-icons/react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { useContext, useMemo } from 'react'

import { UserProfileContext } from '@/contexts/user-profile'

import { DropdownProfile } from './dropdown-profile'
import { DropdownSignInForm } from './dropdown-sign-in-form'

export function DropdownMenu() {
  const { userProfile } = useContext(UserProfileContext)

  const twoLetters = useMemo(() => {
    if (userProfile?.name) {
      const separatedName = userProfile.name?.split(' ')
      const initialLetters =
        separatedName[0][0] + (separatedName[1] ? separatedName[1][0] : '')

      return initialLetters.toUpperCase()
    }
  }, [userProfile?.name])

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button className="w-10 h-10 flex items-center justify-center bg-greenpeace hover:bg-ecogreen text-white rounded-full outline-none cursor-pointer transition-all duration-300">
          {twoLetters ? (
            <span className="text-base font-ubuntu">{twoLetters}</span>
          ) : (
            <User className="w-5 h-5" />
          )}
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className="w-72 flex flex-col gap-1 bg-white rounded-lg shadow-md select-none p-2"
          sideOffset={5}
          align="end"
        >
          <DropdownMenuPrimitive.Arrow className="fill-white" />

          {userProfile ? (
            <DropdownProfile
              name={userProfile.name}
              email={userProfile.email}
            />
          ) : (
            <DropdownSignInForm />
          )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}