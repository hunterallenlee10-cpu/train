import type { PassId } from '@/lib/business'

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  pass?: PassId
  block?: number
}

/**
 * Any control that opens the Block Builder. It is a real <button> rendered on the server.
 * BuilderRoot listens for clicks on [data-builder] and opens the builder with these pre-selects.
 */
export function BuilderButton({ pass, block, children, ...rest }: Props) {
  return (
    <button
      type="button"
      data-builder=""
      data-pass={pass}
      data-block={block === undefined ? undefined : String(block)}
      aria-haspopup="dialog"
      {...rest}
    >
      {children}
    </button>
  )
}
