import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <>
      <Helmet title="404" />

      <div className="w-full h-screen flex flex-col items-center justify-center bg-background gap-2">
        <h1 className="text-4xl font-bold">Página não encontrada</h1>
        <p className="text-texts">
          Voltar para a{' '}
          <Link
            to="/"
            className="text-greenpeace hover:text-ecogreen transition"
          >
            Tela Inicial
          </Link>
        </p>
      </div>
    </>
  )
}
