import { type Icon } from '@phosphor-icons/react'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  LeftIcon?: Icon
  isLoading?: boolean
}

export function Button({
  className,
  LeftIcon,
  disabled,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      disabled={isDisabled}
      className={cn(
        'w-fit flex items-center justify-center relative bg-greenpeace text-sm md:text-base text-white font-bold rounded-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300',
        LeftIcon
          ? 'enabled:hover:brightness-90 p-4 pl-14 md:pl-18'
          : 'enabled:hover:bg-ecogreen py-2 md:py-4 px-6 md:px-10',
        className,
      )}
      {...props}
    >
      {LeftIcon && (
        <LeftIcon className="w-auto h-full absolute top-0 left-0 bg-ecogreen p-4" />
      )}

      {children}
    </button>
  )
}
