import { Helmet } from 'react-helmet-async'
import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <>
      <Helmet title="Error" />

      <main className="w-full h-screen flex flex-col items-center justify-center bg-background gap-2 px-4">
        <h1 className="text-4xl font-bold text-center">
          Whoops, algo aconteceu...
        </h1>
        <p className="text-texts text-center">
          Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:
        </p>
        <pre>{error?.message || JSON.stringify(error)}</pre>
        <p className="text-texts">
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
