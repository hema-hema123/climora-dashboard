import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import dashboardImage from './dashboard/verdantimage.png';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip flex flex-col mb-0">
      {/* Background Map */}
      <div className="fixed inset-0 -z-10">
        <Image src="/MAP BG.svg" alt="" fill className="object-cover" />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 h-[54px] bg-[#1f2b26] z-10">
        <div className="relative h-full flex items-center justify-between px-4 sm:px-5">
          <p className="font-alliance text-lg sm:text-[24px] text-[#ecefe8] tracking-[-0.96px]"> Climora</p>
          <p className="font-alliance text-lg sm:text-[24px] text-white tracking-tight sm:tracking-[-3.6px]">© 2026</p>
        </div>
      </header>

      {/* Logo */}
      <Link
        href="/dashboard"
        className="absolute left-4 sm:left-[34px] top-[70px] sm:top-[90px] w-[80px] h-[80px] sm:w-[153px] sm:h-[153px] z-20 hover:opacity-80 transition-opacity"
      >
        <Image
          src="/images/landing/logo-vector.svg"
          alt="Verdant Logo"
          width={153}
          height={153}
          className="w-full h-full object-contain"
        />
      </Link>

      {/* Hero Section */}
      <section className="relative pt-[140px] sm:pt-[200px] lg:pt-[280px] pb-0">
        {/* Decorative Green Blobs - hidden below lg for performance */}
        <div className="hidden lg:block absolute right-[-13px] top-[167px] w-[603px] h-[603px] z-0">
          <Image
            src="/images/landing/dark-green-1.svg"
            alt=""
            width={603}
            height={603}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="hidden lg:block absolute right-[54px] top-[245px] w-[469px] h-[471px] z-0">
          <Image
            src="/images/landing/dark-green-5.svg"
            alt=""
            width={469}
            height={471}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="hidden lg:flex absolute right-[65.71px] top-[262.46px] w-[432.829px] h-[432.829px] items-center justify-center z-0">
          <div className="rotate-[-15.69deg]">
            <Image
              src="/images/landing/dark-green-6.svg"
              alt=""
              width={351}
              height={351}
              className="w-[351px] h-[351px] object-contain"
            />
          </div>
        </div>
        <div className="hidden lg:flex absolute right-[121.95px] top-[315px] w-[320.053px] h-[325.011px] items-center justify-center z-0">
          <div className="rotate-[24.77deg]">
            <Image
              src="/images/landing/dark-green-7.svg"
              alt=""
              width={238}
              height={248}
              className="w-[237.989px] h-[248.127px] object-contain"
            />
          </div>
        </div>
        <div className="hidden lg:flex absolute right-[164.75px] top-[360.83px] w-[229.754px] h-[230.42px] items-center justify-center z-0">
          <div className="rotate-[-138.97deg]">
            <Image
              src="/images/landing/dark-green-9.svg"
              alt=""
              width={160}
              height={166}
              className="w-[159.687px] h-[166.489px] object-contain"
            />
          </div>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 px-4 sm:px-8 lg:px-[57px]">
          <h1 className="font-alliance text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[128px] leading-[1.15] text-[#1f2b26] tracking-tight lg:tracking-[-5.12px] max-w-full lg:w-[1136px]">
            <p className="mb-0">the new</p>
            <p className="mb-0 text-[#010103]">blueprint</p>
            <p className="mb-0">for a climate</p>
            <p>resilient city.</p>
          </h1>

          {/* Get Started CTA */}
          <div className="mt-8 sm:mt-12 lg:mt-[86px] relative inline-block">
            <div className="absolute left-0 top-[4px] sm:top-[8px] lg:top-[10px] w-full h-full lg:h-[108px] bg-[#c0ffbd]" />
            <Link
              href="/dashboard"
              className="relative z-10 font-alliance text-[2rem] sm:text-5xl md:text-6xl lg:text-[128px] leading-[1.15] text-[#1f2b26] tracking-tight lg:tracking-[-5.12px] inline-block hover:opacity-80 transition-opacity"
            >
              get started. →
            </Link>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="relative px-4 sm:px-8 lg:px-0 lg:min-h-[1100px]">
        {/* Decorative Blobs - Left Side - hidden on mobile/tablet */}
        <div className="hidden lg:block absolute left-[64px] top-[280px] w-[437.082px] h-[437.082px] z-0">
          <Image
            src="/images/landing/dark-green-10.svg"
            alt=""
            width={437}
            height={437}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="hidden lg:block absolute left-[113.67px] top-[335.88px] w-[338.987px] h-[324.087px] z-0">
          <Image
            src="/images/landing/dark-green-11.svg"
            alt=""
            width={339}
            height={324}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="hidden lg:flex absolute left-[145.95px] top-[365.68px] w-[264.632px] h-[264.632px] items-center justify-center z-0">
          <div className="rotate-[4.31deg]">
            <Image
              src="/images/landing/dark-green-12.svg"
              alt=""
              width={247}
              height={247}
              className="w-[246.795px] h-[246.795px] object-contain"
            />
          </div>
        </div>
        {/* Additional nested decorative element */}
        <div className="hidden lg:flex absolute left-[157.13px] top-[391.75px] w-[238.409px] h-[213.062px] items-center justify-center z-0">
          <div className="rotate-[24.77deg]">
            <div className="relative w-[196.029px] h-[144.196px] overflow-clip">
              <div className="absolute inset-[5.77%_11.1%_5.63%_7.11%]">
                <Image
                  src="/images/landing/vector-1.svg"
                  alt=""
                  width={196}
                  height={144}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute left-[calc(50%+0.42px)] top-[9.53px] bottom-[9.46px] flex items-center justify-center w-[99.605px] -translate-x-1/2">
                <div className="rotate-[-101.5deg] scale-y-[0.99] skew-x-[7.15deg] w-[100.359px] h-[84.014px]">
                  <div className="relative w-full h-full overflow-clip">
                    <div className="absolute inset-[5.77%_11.1%_5.63%_7.11%]">
                      <Image
                        src="/images/landing/vector-2.svg"
                        alt=""
                        width={100}
                        height={84}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Definition Content - Mobile & Tablet: flow layout */}
        <div className="lg:hidden pt-12 pb-8 space-y-4 max-w-2xl ml-auto">
          <div className="flex items-baseline gap-3">
            <span className="font-alliance text-base text-[#1f2b26] tracking-[-0.96px] shrink-0">
              (1)
            </span>
            <p className="font-alliance text-4xl sm:text-6xl leading-[1.2] text-[#1f2b26] tracking-tight">
              Climora
            </p>
          </div>
          <p className="font-alliance text-base sm:text-xl leading-normal text-[#1f2b26] tracking-tight">
            <span>/klaɪˈmɔːrə/</span>
            <span>{`   · `}</span>
            <span>noun</span>
          </p>
          <p className="font-alliance text-sm sm:text-base leading-[1.755] text-black tracking-tight">
            The strategic integration of lush, living vegetation into urban landscapes to create
            biological cooling systems. In climate resilience, being &quot;Climora&quot; is the
            measurable transition from heat-absorbing grey infrastructure (asphalt and concrete)
            to heat-mitigating green infrastructure (canopy cover and carbon-sequestering
            parklands).
          </p>
        </div>

        {/* Desktop positioned content (lg and up only) */}
        <p className="hidden lg:block absolute right-[106px] top-[264px] font-alliance text-[128px] leading-[1.2] text-[#1f2b26] text-right tracking-[-5.12px] w-[637px] z-10">
          Climora
        </p>

        <p className="hidden lg:block absolute right-[720px] top-[264px] font-alliance text-[24px] text-[#1f2b26] tracking-[-0.96px] w-[32px] z-10">
          (1)
        </p>

        <p className="hidden lg:block absolute right-[106px] top-[422px] font-alliance text-[36px] leading-[0] text-[#1f2b26] text-right tracking-[-1.44px] w-[611px] z-10">
          <span className="leading-normal">/klaɪˈmɔːrə/</span>
          <span className="leading-normal">{`   · `}</span>
          <span className="leading-normal">noun</span>
        </p>
        <div className="hidden lg:flex absolute right-[105px] top-[559px] items-center justify-center w-[608.874px] z-10">
          <div className="rotate-[0.19deg]">
            <p className="font-alliance text-[24px] leading-[1.755] text-black text-right tracking-[-0.96px] w-[606.854px]">
              The strategic integration of lush, living vegetation into urban landscapes to create
              biological cooling systems. In climate resilience, being &quot;Climora&quot; is the
              measurable transition from heat-absorbing grey infrastructure (asphalt and concrete)
              to heat-mitigating green infrastructure (canopy cover and carbon-sequestering
              parklands).
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative pb-10 sm:pb-16 lg:pb-20 pt-8">
        <div className="px-4 sm:px-8 lg:px-[57px]">
          {/* Title and number */}
          <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
            <p className="font-alliance text-4xl sm:text-6xl md:text-7xl lg:text-[128px] leading-[1.2] text-[#1f2b26] tracking-tight lg:tracking-[-5.12px]">
              gallery
            </p>
            <span className="font-alliance text-sm sm:text-base lg:text-[24px] text-[#1f2b26] tracking-[-0.96px] mt-4 sm:mt-8 lg:mt-[85px]">
              (2)
            </span>
          </div>
        </div>

        {/* Dashboard Image */}
        <div className="relative w-full max-w-[1141px] aspect-[1141/412] rounded-xl sm:rounded-2xl lg:rounded-[25px] overflow-hidden mb-4 mx-auto px-4 sm:px-8 lg:px-0">
          <Image
            src={dashboardImage}
            alt="Climora Dashboard - Indian cities"
            fill
            className="object-cover"
          />
        </div>

        {/* Caption */}
        <div className="px-4 sm:px-8 lg:px-[57px] max-w-[1101px] mx-auto">
          <div className="font-alliance text-sm sm:text-base lg:text-[24px] leading-[1.755] text-black tracking-tight lg:tracking-[-0.96px]">
            <p className="mb-0"> Climora DASHBOARD / Indian cities →</p>
            <p>A visual showcase of urban heatmaps in the Indian cities.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative pb-12 sm:pb-16 lg:pb-[100px] pt-8">
        <div className="relative px-4 sm:px-8 lg:px-[80px]">
          <div className="flex items-start gap-3 sm:gap-4 relative z-10 sm:justify-end">
            <div className="flex items-baseline gap-3 flex-wrap max-w-full sm:max-w-[749px]">
              <span className="font-alliance text-sm sm:text-base lg:text-[24px] text-[#1f2b26] tracking-[-0.96px] shrink-0 mt-4 sm:mt-8 lg:mt-[85px]">
                (3)
              </span>
              <div className="relative inline-block">
                <div className="absolute left-0 top-[4px] sm:top-[8px] w-full h-full bg-[#c0ffbd]" />
                <p className="relative z-10 font-alliance text-xl sm:text-3xl md:text-4xl lg:text-[64px] leading-[0.97] text-black sm:text-right tracking-tight lg:tracking-[-2.56px]">
                  Start your journey toward a more Climora city today. ↗
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
