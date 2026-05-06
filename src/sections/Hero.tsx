import { ChevronDown, Smartphone } from "lucide-react";
import WanderingQuestionsCanvas from "../components/WanderingQuestionsCanvas";

export default function Hero() {
  return (
    <section
      id='hero'
      className='relative min-h-svh flex flex-col items-center justify-center overflow-hidden'
      style={{
        background:
          "radial-gradient(ellipse at center, #FDF9F6 0%, #FBF2ED 100%)",
      }}
    >
      <WanderingQuestionsCanvas className='absolute inset-0 opacity-35' />

      <div className='relative z-10 flex flex-col items-center text-center px-5 md:px-8 lg:px-20 max-w-4xl mx-auto'>
        {/* Beta badge */}
        <div
          className='inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-8'
          style={{
            animation: "fade-in-up 0.5s ease-out 0.2s both",
          }}
        >
          <span className='w-2 h-2 rounded-full bg-accent-primary animate-pulse' />
          <span className='font-body text-xs font-medium text-accent-primary tracking-wide'>
            Live on iOS
          </span>
        </div>

        {/* Main title */}
        <h1
          className='font-display font-bold text-accent-primary leading-none text-[64px] sm:text-[100px] md:text-[130px] lg:text-[160px]'
          style={{
            letterSpacing: "-0.02em",
            animation: "fade-in-up 0.8s ease-out 0.2s both",
          }}
        >
          Twogether
        </h1>

        {/* Divider */}
        <div
          className='w-16 sm:w-[120px] h-px bg-accent-secondary mt-4 sm:mt-6 mb-4 sm:mb-6'
          style={{
            animation: "fade-in-up 0.6s ease-out 0.3s both",
          }}
        />

        {/* Subtitle */}
        <p
          className='font-body font-normal text-text-secondary max-w-[320px] sm:max-w-[480px] text-xl sm:text-2xl md:text-3xl'
          style={{
            animation: "fade-in-up 0.6s ease-out 0.4s both",
          }}
        >
          Questions that bring people closer.
        </p>

        {/* CTA buttons */}
        <div
          className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 sm:mt-10 w-full sm:w-auto px-4 sm:px-0'
          style={{
            animation: "fade-in-scale 0.5s ease-out 0.6s both",
          }}
        >
          <a
            href='#download'
            className='inline-flex items-center justify-center gap-2.5 bg-accent-primary text-white font-body font-semibold text-base rounded-full px-7 py-4 button-shadow transition-all duration-250 ease-out hover:scale-[1.03] hover:shadow-button'
          >
            <Smartphone className='w-5 h-5' />
            Download on the App Store
          </a>
          <a
            href='#how-it-works'
            className='inline-flex items-center justify-center gap-2 border border-accent-glow text-accent-primary font-body font-semibold text-base rounded-full px-7 py-4 transition-all duration-250 ease-out hover:bg-accent-primary hover:text-white hover:border-accent-primary'
          >
            See how it works
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10'
        style={{
          animation: "fade-in-up 0.5s ease-out 0.9s both",
        }}
      >
        <ChevronDown className='w-6 h-6 text-accent-secondary opacity-50 animate-bounce-subtle' />
      </div>
    </section>
  );
}
