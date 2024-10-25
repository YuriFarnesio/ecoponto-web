import { Info } from '@phosphor-icons/react'
import { InputMask, type InputMaskProps } from '@react-input/mask'
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Tooltip } from './tooltip'

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    InputMaskProps {
  label: string
  tooltipText?: string | ReactNode
  errorMessage?: string
}

const MaskedInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type,
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
          className="flex items-center text-xs md:text-sm text-texts"
        >
          {required && <span className="text-red-500 mr-0.5">*</span>}
          {label}
          {tooltipText && (
            <Tooltip text={tooltipText}>
              <Info className="w-4 h-4 ml-0.5" />
            </Tooltip>
          )}
        </label>

        <InputMask
          id={id}
          type={type}
          className={cn(
            'bg-background text-sm md:text-base text-texts placeholder:text-placeholder rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-greenpeace py-2 md:py-4 px-3 md:px-6 transition-all duration-300',
            className,
          )}
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

MaskedInput.displayName = 'MaskedInput'

export { MaskedInput }
