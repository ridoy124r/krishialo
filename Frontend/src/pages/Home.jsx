// src/pages/Home.jsx
import React from "react";

import FarmHero from "../components/Hero";
import WaitherSection from "../components/WaitherSection";
import HighlightedServices from "../components/Highlighted";
import CollaborationSlider from "../components/Collabarate";
import Commitment from "../components/Commitment";
import LeadingTeam from "../components/Team";
import StatsSection from "../components/Client";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <FarmHero />
      <WaitherSection />
      <HighlightedServices />
      <CollaborationSlider />
      <Commitment />
      <LeadingTeam />
      <StatsSection />
      <Contact />
    </>
  );
}
