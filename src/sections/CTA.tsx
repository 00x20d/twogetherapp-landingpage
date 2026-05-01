import { Download, CheckCircle } from "lucide-react";
import WanderingQuestionsCanvas from "../components/WanderingQuestionsCanvas";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function CTA() {
  const { ref: sectionRef, isIntersecting } =
    useIntersectionObserver<HTMLElement>({ threshold: 0.3 });

  return (
    <section
      ref={sectionRef}
      id='download'
      className='relative min-h-[60vh] flex items-center justify-center overflow-hidden py-[80px] md:py-[120px] px-5 md:px-8 lg:px-20'
      style={{
        background:
          "radial-gradient(ellipse at center, #FDF9F6 0%, #FBF2ED 100%)",
      }}
    >
      <WanderingQuestionsCanvas
        className='absolute inset-0 opacity-35'
        sparse
      />

      <div className='relative z-10 flex flex-col items-center text-center max-w-[600px]'>
        <h2
          className={`font-display font-bold text-accent-primary leading-tight mb-5 transition-all duration-800 ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          The right question changes everything.
        </h2>

        <p
          className={`font-body font-normal text-lg text-text-secondary mb-8 transition-all duration-600 delay-200 ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          Download Twogether and send your first card today.
        </p>

        <a
          href='#'
          className={`inline-flex items-center gap-2.5 bg-accent-primary text-white font-body font-semibold text-lg rounded-full px-10 py-5 button-shadow transition-all duration-250 ease-out hover:scale-105 hover:shadow-glow ${
            isIntersecting ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            transitionDelay: isIntersecting ? "400ms" : "0ms",
          }}
        >
          <Download className='w-5 h-5' />
          Get Twogether for iOS
        </a>

        <div
          className={`flex items-center gap-2 mt-5 transition-all duration-400 ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
          style={{
            transitionDelay: isIntersecting ? "600ms" : "0ms",
          }}
        >
          <CheckCircle className='w-4 h-4 text-accent-secondary' />
          <span className='font-body font-normal text-[13px] text-text-secondary'>
            Free to download · No account required
          </span>
        </div>
      </div>
    </section>
  );
}
