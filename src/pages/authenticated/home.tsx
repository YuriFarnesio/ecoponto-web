import { MagnifyingGlass, Plus } from '@phosphor-icons/react'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { UserProfileContext } from '@/contexts/user-profile'

import { Button } from '@/components/button'

export function Home() {
  const { userProfile } = useContext(UserProfileContext)

  return (
    <>
      <Helmet title="Início" />

      <img
        width={878}
        height={614}
        src="/background.svg"
        alt="Pessoas coletando lixo de forma correta"
        className="w-auto h-auto max-w-full max-h-full absolute bottom-0 right-0 pointer-events-none"
      />

      <main className="w-full h-[calc(100%-4rem)] md:h-[calc(100%-7.75rem)] max-w-7xl flex flex-col items-center xl:items-start xl:justify-center relative py-6 lg:py-10 px-6 md:px-10 xl:px-20 xl:py-0 mx-auto z-30">
        <h1 className="max-w-80 lg:max-w-[560px] font-ubuntu text-3xl lg:text-5xl text-title font-bold text-center xl:text-left">
          Seu marketplace de coleta de resíduos.
        </h1>
        <h2 className="max-w-md text-xl lg:text-2xl leading-9 text-texts mt-2 xl:mt-6 text-center xl:text-left">
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </h2>

        {userProfile?.id ? (
          <Link to="/points" className="w-fit mt-2 lg:mt-4 xl:mt-6">
            <Button LeftIcon={MagnifyingGlass}>
              Encontre um ponto de coleta
            </Button>
          </Link>
        ) : (
          <Link to="/sign-up" className="w-fit mt-2 lg:mt-4 xl:mt-6">
            <Button LeftIcon={Plus}>Cadastre seu perfil agora</Button>
          </Link>
        )}
      </main>
    </>
  )
}
