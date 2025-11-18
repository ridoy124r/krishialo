import React from 'react'
import RightWaithersec from './rightWaithersec'
import SeasonCard from './SeasonCard'

const WaitherSection = () => {
  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex flex-col items-center p-6">

      <div className="text-center mb-6 sm:mb-8 md:mb-10 mt-3 sm:mt-4 md:mt-5">
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
    Know The Weather Update
  </h1>

  {/* Responsive: w-full on all screens, using margin-x-auto for centering */}
  <div className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto mt-1 h-3 border-b-4 border-red-500 rounded-full"></div>
</div>
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
     
        <div className="flex justify-center">
          <SeasonCard />
        </div>

      
        <div className="flex justify-center">
          <RightWaithersec />
        </div>

      </div>
    </div>
  )
}

export default WaitherSection
