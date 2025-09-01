import React from 'react'

function HeroImage() {
  return (
    <div className="flex py-7 justify-center min-h-screen min-w-screen">
      <div className="flex flex-col items-start p-4 w-[960px] h-[512px]">
        <div className="relative w-[928px] h-[480px] min-h-[480px] rounded-xl bg-[url('/momImage.png')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/40 rounded-xl" />

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-[800px] flex flex-col items-center gap-2">
            <h1 className="text-white font-bold text-[48px] leading-[60px] tracking-[-0.05em] text-center whitespace-nowrap">
              Your Journey, Our Support
            </h1>

            <p className="text-white text-[18px] leading-[24px] text-center max-w-[1200px]">
              Motherly is your companion through pregnancy and beyond, offering
              personalized tracking, expert support, and resources for a healthy
              motherhood.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroImage;