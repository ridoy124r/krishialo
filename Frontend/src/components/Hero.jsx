export default function FarmHero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/hero.png')` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 min-h-screen  flex items-center">
        <div className="w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-20">
          <div className="max-w-2xl">
            <h1 className="text-white font-bold mb-6 sm:mb-8">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-snug sm:leading-snug md:leading-tight lg:leading-tight">
                Digitize Your Farm.
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-snug sm:leading-snug md:leading-tight lg:leading-tight">
                Revolutionize Your Harvest.
              </span>
             
            </h1>

            {/* Description */}
            <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-2xl mb-10 sm:mb-12 leading-relaxed max-w-xl">
              Leverage our advanced IoT solutions to get real-time data on soil,
              water, and crop health. Reduce costs, increase yield.
            </p>

            <div className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-6 lg:space-x-8 space-y-4 sm:space-y-0">
              <button
                className="bg-red-600 hover:bg-red-700 active:bg-red-800  text-white font-bold text-sm sm:text-base md:text-md lg:text-md rounded-md
         px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-3 sm:py-3 md:py-4 lg:py-5 2xl:py-6 uppercase tracking-wide transition-all duration-300 transform hover:scale-105"
              >
                BOOK A SERVICE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
