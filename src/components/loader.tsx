interface LoaderProps {
  message?: string
}

export function Loader({ message = 'Carregando dados...' }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center absolute inset-0 gap-4 bg-overlay z-50 px-4">
      <img
        src="/ecoponto.svg"
        alt="Logo EcoPonto"
        className="w-14 h-12 md:w-24 md:h-[5.5rem] pointer-events-none animate-bounce"
      />

      <p className="font-ubuntu text-xl md:text-3xl text-white font-bold text-center">
        {message}
      </p>
    </div>
  )
}
