import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative mt-auto mb-0 bg-[#1f2b26] px-4 py-8 sm:px-6 md:px-8 lg:px-[25px] lg:py-[15px] lg:h-[179px]">
      <div className="relative h-full flex flex-col gap-6 lg:block lg:gap-0">
        {/* Logo and Brand - stacked on mobile, row on sm+, absolutely positioned on lg+ */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3 lg:absolute lg:bottom-0 lg:left-[25px] lg:gap-[11px]">
          <Image
            src="/images/landing/light-green-logo.svg"
            alt="Climora Logo"
            width={105}
            height={105}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[105px] lg:h-[105px] object-contain"
          />
          <div className="flex items-baseline gap-2 sm:gap-3">
            <p className="font-alliance text-3xl sm:text-4xl md:text-5xl lg:text-[128px] leading-[1.2] text-[#91b1a2] tracking-tight lg:tracking-[-5.12px]">
              Climora
            </p>
            <p className="font-alliance text-sm sm:text-base md:text-lg lg:text-[32px] leading-normal text-[#91b1a2] opacity-33 tracking-tight lg:tracking-[-4.8px]">
              © 2026
            </p>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="text-center lg:absolute lg:right-[15px] lg:top-1/2 lg:-translate-y-1/2">
          <a
            href="https://github.com/martinlcam/verdant"
            target="_blank"
            rel="noopener noreferrer"
            className="font-alliance text-sm sm:text-[15px] leading-normal text-[#cfcfcf] mb-2 hover:text-[#ecefe8] transition-colors inline-block"
          >
            Github Repository
          </a>
          <div className="font-alliance text-xs sm:text-sm lg:text-[15px] leading-normal text-[#545454]">
            <p className="mb-0">Hema.S</p>
            <p className="mb-0">Rakshitha.M.H</p>
            <p className="mb-0">Sahana.G.S</p>
          </div>
          <p className="font-alliance text-xs sm:text-sm lg:text-[15px] leading-normal text-[#545454] mt-2 lg:mt-4">
            Powered by Google LLC. ©
          </p>
        </div>
      </div>
    </footer>
  );
}
