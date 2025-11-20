import React from 'react'
import Navbar from './components/Navbar'
import FarmHero from './components/Hero'
import WaitherSection from './components/WaitherSection'
import HighlightedServices from './components/Highlighted'
import CollaborationSlider from './components/Collabarate'
import Commitment from './components/Commitment'
import LeadingTeam from './components/Team'
import StatsSection from './components/Client'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <FarmHero />
      <WaitherSection />
      <HighlightedServices/>
      <CollaborationSlider/>
      <Commitment/>
      <LeadingTeam/>
      <StatsSection/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
