import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import Passes from '@/components/sections/Passes'
import BlockMathSection from '@/components/sections/BlockMathSection'
import HowItWorks from '@/components/sections/HowItWorks'
import FindTheGarage from '@/components/sections/FindTheGarage'
import Trainers from '@/components/sections/Trainers'
import GiftCards from '@/components/sections/GiftCards'
import QandA from '@/components/sections/QandA'
import FinalBand from '@/components/sections/FinalBand'
import Footer from '@/components/sections/Footer'
import BuilderRoot from '@/components/BuilderRoot'
import StickyBar from '@/components/StickyBar'
import { business } from '@/lib/business'

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Passes />
        <BlockMathSection />
        <HowItWorks />
        <FindTheGarage />
        <Trainers />
        <GiftCards />
        <QandA />
        <FinalBand />
      </main>
      <Footer />
      <StickyBar email={business.email} />
      <BuilderRoot />
    </>
  )
}
