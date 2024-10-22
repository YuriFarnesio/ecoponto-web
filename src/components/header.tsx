import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserProfileContext } from '@/contexts/user-profile'

import { DropdownMenu } from './dropdown-menu'

export function Header() {
  const { userProfile } = useContext(UserProfileContext)

  return (
    <header className="w-full relative z-40">
      <div className="w-full max-w-7xl flex py-10 px-20 mx-auto">
        <div className="w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-5 select-none">
            <img
              width={48}
              height={44}
              src="/ecoponto.svg"
              alt="Logo EcoPonto"
              className="pointer-events-none"
            />

            <span className="font-ubuntu text-3xl text-title font-bold">
              EcoPonto
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {!userProfile && (
              <p className="w-fit text-title font-bold">
                Faça seu login para continuar {'>'}
              </p>
            )}

            <DropdownMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
