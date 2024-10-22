import { MagnifyingGlass, Plus } from '@phosphor-icons/react'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { UserProfileContext } from '@/contexts/user-profile'

import { Button } from '@/components/button'
import { Header } from '@/components/header'

export function Home() {
  const { userProfile } = useContext(UserProfileContext)

  return (
    <>
      <Helmet title="Início" />

      <div className="w-full h-screen relative bg-background overflow-hidden">
        <img
          width={878}
          height={614}
          src="/background.svg"
          alt="Pessoas coletando lixo de forma correta"
          className="w-auto h-auto max-w-full max-h-full absolute bottom-0 right-0 pointer-events-none"
        />

        <Header />

        <main className="w-full h-[calc(100%-7.75rem)] max-w-7xl flex flex-col justify-center relative px-20 mx-auto z-30">
          <h1 className="max-w-[560px] font-ubuntu text-5xl text-title font-bold">
            Seu marketplace de coleta de resíduos.
          </h1>
          <h2 className="max-w-md text-2xl leading-9 text-texts mt-6">
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </h2>

          {userProfile ? (
            <Link to="/points" className="w-fit mt-6">
              <Button LeftIcon={MagnifyingGlass}>
                Encontre um ponto de coleta
              </Button>
            </Link>
          ) : (
            <Link to="/sign-up" className="w-fit mt-6">
              <Button LeftIcon={Plus}>Cadastre-se agora</Button>
            </Link>
          )}
        </main>
      </div>
    </>
  )
}
