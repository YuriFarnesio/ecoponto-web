import { CaretDown, Check } from '@phosphor-icons/react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '@/lib/utils'

interface SelectProps extends SelectPrimitive.SelectProps {
  label: string
  placeholder: string
  items: {
    value: string
    label: string
  }[]
  className?: string
  errorMessage?: string
}

export function Select({
  name,
  required,
  label,
  placeholder,
  items,
  className,
  errorMessage,
  onValueChange,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1 md:gap-2">
      <label
        htmlFor={name}
        className="flex items-center text-xs md:text-sm text-texts"
      >
        {required && <span className="text-red-500 mr-0.5">*</span>}
        {label}
      </label>

      <SelectPrimitive.Root onValueChange={onValueChange} {...props}>
        <SelectPrimitive.Trigger
          id={name}
          className={cn(
            'h-8 md:h-14 flex items-center justify-between bg-background text-sm md:text-base text-texts data-[placeholder]:text-placeholder rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-greenpeace py-2 md:py-4 px-3 md:px-6 transition-all duration-300 [&>span]:line-clamp-1',
            className,
          )}
          {...props}
        >
          <SelectPrimitive.Value placeholder={placeholder} />

          <SelectPrimitive.Icon asChild>
            <CaretDown />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            className={cn(
              'min-w-full max-w-full max-h-96 relative overflow-hidden rounded-lg border bg-background text-title shadow-md z-40',
              'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            )}
          >
            <SelectPrimitive.Viewport className="h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]">
              {items.map((item) => (
                <SelectPrimitive.Item
                  key={item.value}
                  value={item.value}
                  className="w-full relative flex items-center focus:bg-desaturated active:bg-greenpeace data-[state=checked]:bg-ecogreen text-sm active:text-white data-[state=checked]:text-white cursor-default outline-none select-none py-2 pr-2 pl-8"
                >
                  <span className="w-4 h-4 flex items-center justify-center absolute left-2">
                    <SelectPrimitive.ItemIndicator>
                      <Check className="w-4 h-4" />
                    </SelectPrimitive.ItemIndicator>
                  </span>

                  <SelectPrimitive.ItemText>
                    {item.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {errorMessage && (
        <span className="text-xs leading-tight text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  )
}
