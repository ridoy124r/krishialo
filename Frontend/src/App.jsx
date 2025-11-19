import React from 'react'
import Navbar from './components/Navbar'
import FarmHero from './components/Hero'
import WaitherSection from './components/WaitherSection'
import HighlightedServices from './components/Highlighted'
import CollaborationSlider from './components/Collabarate'

const App = () => {
  return (
    <div>
      <Navbar />
      <FarmHero />
      <WaitherSection />
      <HighlightedServices/>
      <CollaborationSlider/>
    </div>
  )
}

export default App
