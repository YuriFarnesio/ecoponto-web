import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserProfileContext } from '@/contexts/user-profile'

import { DropdownMenu } from './dropdown-menu'

export function Header() {
  const { userProfile } = useContext(UserProfileContext)

  return (
    <header className="w-full relative z-40">
      <div className="w-full max-w-7xl flex py-4 md:py-10 px-6 md:px-10 xl:px-20 mx-auto">
        <div className="w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1 md:gap-5 select-none">
            <img
              width={48}
              height={44}
              src="/ecoponto.svg"
              alt="Logo EcoPonto"
              className="w-6 md:w-12 h-[1.375rem] md:h-11 pointer-events-none"
            />

            <span className="font-ubuntu text-base md:text-3xl text-title font-bold">
              EcoPonto
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {!userProfile?.id && (
              <p className="w-fit text-sm md:text-base text-title font-bold">
                Faça seu login {'>'}
              </p>
            )}

            <DropdownMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
