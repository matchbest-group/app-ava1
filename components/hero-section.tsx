"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <>
      <section className="relative pt-24 pb-16 text-center w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Transparency */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg/bg1.png"
            alt="Hero Background"
            fill
            className="object-cover object-center opacity-40"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/30"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 drop-shadow-sm">
            <span className="text-black/90 font-bold">AVA </span>
            <span className="text-blue-600 font-bold">Suite.</span>
            <br />
            <span className="text-blue-600 font-bold">Infinite </span>
            <span className="text-black/90 font-bold">Possibilities.</span>
            <br />
            <span className="text-black/90 font-bold">All with </span>
            <span className="text-blue-600 font-bold">AI.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-black/80 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
            One platform for all your business tech needs — AI that works for you
          </p>
        </div>
      </section>

      {/* Logos Box */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div
          className="rounded-3xl lg:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 min-h-[400px] shadow-2xl backdrop-blur-sm"
          style={{
            background: "linear-gradient(135deg, rgba(53, 96, 199, 0.95) 0%, rgba(152, 42, 204, 0.95) 100%)",
          }}
        >
          {/* Grid wrapper */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-6 lg:gap-8 items-center justify-items-center">
            
            {/* Left column logos */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-full max-w-xs h-32 lg:h-40 hover:scale-105">
              <Image 
                src="/logo3.png" 
                alt="Logo 3" 
                width={200} 
                height={90} 
                className="object-contain"
              />
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-full max-w-xs h-32 lg:h-40 lg:row-start-2 lg:col-start-1 hover:scale-105">
              <Image 
                src="/logo2.png" 
                alt="Logo 2" 
                width={200} 
                height={90} 
                className="object-contain"
              />
            </div>

            {/* Center logo (larger) */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center w-full max-w-sm h-40 lg:h-48 lg:row-span-2 lg:col-start-2 order-first sm:order-none hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Main Logo" 
                width={280} 
                height={140} 
                className="object-contain"
              />
            </div>

            {/* Right column logos */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-full max-w-xs h-32 lg:h-40 lg:col-start-3 hover:scale-105">
              <Image 
                src="/logo1.png" 
                alt="Logo 1" 
                width={200} 
                height={90} 
                className="object-contain"
              />
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-full max-w-xs h-32 lg:h-40 lg:row-start-2 lg:col-start-3 hover:scale-105">
              <Image 
                src="/logo4.png" 
                alt="Logo 4" 
                width={200} 
                height={90} 
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
