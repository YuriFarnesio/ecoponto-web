import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function OutlineButton({
  disabled,
  children,
  ...props
}: OutlineButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-texts enabled:hover:text-black border border-texts enabled:hover:border-black rounded-lg p-0 transition-all duration-300',
        disabled && 'text-background border-background cursor-not-allowed',
      )}
      {...props}
    >
      {children}
    </button>
  )
}
