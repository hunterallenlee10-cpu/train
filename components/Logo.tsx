import Image from 'next/image'

// The train. spray script wordmark, trimmed of its transparent padding. Always the image, never a font.
export function Logo({ tone = 'black', className, sizes, preload }: { tone?: 'black' | 'white'; className?: string; sizes: string; preload?: boolean }) {
  const black = tone === 'black'
  return (
    <Image
      src={black ? '/images/logo-black.png' : '/images/logo-white.png'}
      width={black ? 640 : 658}
      height={black ? 553 : 568}
      alt="train."
      sizes={sizes}
      className={className}
      preload={preload}
    />
  )
}
