import Hero from '../components/Home/Hero'
import WhatIsSynfolix from '../components/Home/WhatIsSynfolix'
import ProductShowcase from '../components/Home/ProductShowcase'
import BuildWithSynfolix from '../components/Home/BuildWithSynfolix'
import Industries from '../components/Home/Industries'
import TechCapabilities from '../components/Home/TechCapabilities'
import CaseStudies from '../components/Home/CaseStudies'
import WhySynfolix from '../components/Home/WhySynfolix'
import DevelopmentProcess from '../components/Home/DevelopmentProcess'
import About from '../components/Home/About'
import Contact from '../components/Home/Contact'

function Home() {
  return (
    <>
      <Hero />
      <WhatIsSynfolix />
      <ProductShowcase />
      <BuildWithSynfolix />
      <Industries />
      <TechCapabilities />
      <CaseStudies />
      <WhySynfolix />
      <DevelopmentProcess />
      <About />
      <Contact />
    </>
  )
}

export default Home
