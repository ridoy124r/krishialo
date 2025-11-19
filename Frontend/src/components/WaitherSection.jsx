import React from 'react'
import RightWaithersec from './rightWaithersec'
import SeasonCard from './SeasonCard'
import BusinessGrowthDashboard from './Growth'

const WaitherSection = () => {
  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex flex-col items-center p-6">

      <div className="text-center mb-6 sm:mb-8 md:mb-10 mt-3 sm:mt-4 md:mt-5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-green-900 leading-tight mt-4 mb-3">
          Know The <span className='text-red-600'>Weather</span> Update
        </h1>
     
      </div>
      
      <div className="max-w-7xl w-full space-y-8">
        {/* Weather Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <SeasonCard />
          </div>
          <div className="flex justify-center">
            <RightWaithersec />
          </div>
        </div>

        {/* Business Growth Section */}
        <div className="w-full justify-center items-center">
          <BusinessGrowthDashboard />
        </div>
      </div>
    </div>
  )
}

export default WaitherSection