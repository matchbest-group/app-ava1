"use client"

import Image from "next/image"

export function HeroSection() {
  return (
<section className="pt-16 pb-12 px-6 sm:px-8 lg:px-12 text-center max-w-7xl mx-auto">
      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl font-semibold leading-snug mb-6">
        <span className="text-black">AVA </span>
        <span className="text-[#4B6CEB]">Suite.</span>
        <br />
        <span className="text-[#4B6CEB]">Infinite </span>
        <span className="text-black">Possibilities.</span>
        <br />
        <span className="text-black">All with </span>
        <span className="text-[#4B6CEB]">AI.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-black mb-16 max-w-2xl mx-auto">
        One platform for all your business tech needs — AI that works for you
      </p>

      {/* Logos Box */}
      <div
        className="rounded-3xl p-12 sm:p-16 mx-auto max-w-7xl"
        style={{
          background: "linear-gradient(180deg, #3560C7 0%, #982ACC 100%)",
        }}
      >
        <div className="grid grid-cols-5 grid-rows-3 gap-12 items-center justify-items-center">
          {/* Top row: 2 logos */}
          <div className="row-start-1 col-start-1 col-span-1 bg-white rounded-lg p-6 shadow-md flex items-center justify-center">
            <Image src="/logo2.png" alt="Logo 1" width={140} height={70} />
          </div>
          <div className="row-start-1 col-start-5 col-span-1 bg-white rounded-lg p-6 shadow-md flex items-center justify-center">
            <Image src="/logo1.png" alt="Logo 2" width={140} height={70} />
          </div>

          {/* Middle row: 1 logo centered */}
          <div className="row-start-2 col-start-3 col-span-1 bg-white rounded-lg p-6 shadow-md flex items-center justify-center">
            <Image src="/logo.png" alt="Logo 3" width={140} height={70} />
          </div>

          {/* Bottom row: 2 logos */}
          <div className="row-start-3 col-start-1 col-span-1 bg-white rounded-lg p-6 shadow-md flex items-center justify-center">
            <Image src="/logo3.png" alt="Logo 4" width={140} height={70} />
          </div>
          <div className="row-start-3 col-start-5 col-span-1 bg-white rounded-lg p-6 shadow-md flex items-center justify-center">
            <Image src="/logo4.png" alt="Logo 5" width={140} height={70} />
          </div>
        </div>
      </div>
    </section>
  )
}
