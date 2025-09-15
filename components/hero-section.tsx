"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <>
      <section
        className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/bg/bg1.png')" }}
      >
        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-snug mb-10 ">
          <span className="text-black font-bold">AVA </span>
          <span className="text-blue-600 font-bold">Suite.</span>
          <br />
          <span className="text-blue-600 font-bold">Infinite </span>
          <span className="text-black font-bold">Possibilities.</span>
          <br />
          <span className="text-black font-bold">All with </span>
          <span className="text-blue-600 font-bold">AI.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-black mb-16 max-w-full mx-auto break-words">
          One platform for all your business tech needs — AI that works for you
        </p>
      </section>

      {/* Logos Box */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
  <div
    className="rounded-[2.5rem] p-12 sm:p-16 min-h-[400px]"
    style={{
      background: "linear-gradient(180deg, #3560C7 0%, #982ACC 100%)",
    }}
  >
    {/* Grid wrapper */}
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-8 lg:gap-12 items-center justify-items-center">
      
      {/* Left column logos */}
      <div className="bg-white rounded-3xl p-4 shadow-md flex items-center justify-center w-full max-w-xs h-40">
        <Image src="/logo3.png" alt="Logo 1" width={220} height={100} />
      </div>
      <div className="bg-white rounded-3xl p-4 shadow-md flex items-center justify-center w-full max-w-xs h-40 lg:row-start-2 lg:col-start-1">
        <Image src="/logo2.png" alt="Logo 2" width={220} height={100} />
      </div>

      {/* Center logo → only spans 2 rows on large screens */}
      <div className="bg-white rounded-3xl p-4 shadow-md flex items-center justify-center w-full max-w-xs h-40 lg:row-span-2 lg:col-start-2">
        <Image src="/logo.png" alt="Logo 3" width={220} height={100} />
      </div>

      {/* Right column logos */}
      <div className="bg-white rounded-3xl p-4 shadow-md flex items-center justify-center w-full max-w-xs h-40 lg:row-start-1 lg:col-start-3">
        <Image src="/logo1.png" alt="Logo 4" width={220} height={100} />
      </div>
      <div className="bg-white rounded-3xl p-4 shadow-md flex items-center justify-center w-full max-w-xs h-40 lg:row-start-2 lg:col-start-3">
        <Image src="/logo4.png" alt="Logo 5" width={220} height={100} />
      </div>
    </div>
  </div>
</div>

    </>
  )
}
