import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from '@/pages/404'
import { AuthenticatedLayout } from '@/pages/_layouts/authenticated'
import { CreatePoint } from '@/pages/authenticated/create-point'
import { Home } from '@/pages/authenticated/home'
import { UpdatePoint } from '@/pages/authenticated/update-point'
import { UpdateUser } from '@/pages/authenticated/update-user'
import { Error } from '@/pages/error'
import { SignUp } from '@/pages/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticatedLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/update-user',
        element: <UpdateUser />,
      },
      {
        path: '/points',
        element: <CreatePoint />, // TODO Criar tela de listagem de pontos
      },
      {
        path: '/create-point',
        element: <CreatePoint />,
      },
      {
        path: '/update-point/:id',
        element: <UpdatePoint />,
      },
    ],
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
