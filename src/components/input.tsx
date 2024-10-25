import { Info } from '@phosphor-icons/react'
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Tooltip } from './tooltip'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'dropdown'
  label: string
  tooltipText?: string | ReactNode
  errorMessage?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type,
      variant = 'default',
      label,
      tooltipText,
      errorMessage,
      required,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-1 md:gap-2">
        <label
          htmlFor={id}
          className={cn(
            'flex items-center text-xs md:text-sm text-texts',
            variant === 'dropdown' && 'text-xs',
          )}
        >
          {required && <span className="text-red-500 mr-0.5">*</span>}
          {label}
          {tooltipText && (
            <Tooltip text={tooltipText}>
              <Info className="w-4 h-4 ml-0.5" />
            </Tooltip>
          )}
        </label>

        <input
          id={id}
          type={type}
          className={cn(
            'bg-background text-sm md:text-base text-texts placeholder:text-placeholder rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-greenpeace py-2 md:py-4 px-3 md:px-6 transition-all duration-300',
            variant === 'dropdown' && 'text-sm py-2 px-3',
            className,
          )}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.stopPropagation()
          }
          ref={ref}
          {...props}
        />

        {errorMessage && (
          <span className="text-xs leading-tight text-red-500">
            {errorMessage}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
