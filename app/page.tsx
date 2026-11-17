import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import Passes from '@/components/sections/Passes'
import BlockMathSection from '@/components/sections/BlockMathSection'
import Footer from '@/components/sections/Footer'

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Passes />
        <BlockMathSection />
      </main>
      <Footer />
    </>
  )
}
