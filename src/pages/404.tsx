import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <>
      <Helmet title="404" />

      <main className="w-full h-screen flex flex-col items-center justify-center bg-background gap-2 px-4">
        <h1 className="text-4xl font-bold text-center">
          Página não encontrada
        </h1>
        <p className="text-texts text-center">
          Voltar para a{' '}
          <Link
            to="/"
            className="text-greenpeace hover:text-ecogreen transition"
          >
            Tela Inicial
          </Link>
        </p>
      </main>
    </>
  )
}
