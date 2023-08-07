import * as Separator from '@radix-ui/react-separator';

interface SeparatorComponentProps {
  className?: string;
}

export function SeparatorComponent({ className }: SeparatorComponentProps) {
  return (
    <Separator.Root className={`h-[0.0625rem] bg-borderDark ${className}`} />
  )
}