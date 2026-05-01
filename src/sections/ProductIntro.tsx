import { HelpCircle } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const features = [
  {
    dot: "#635885",
    name: "Deep & Meaningful",
    question: "What's a belief you held strongly that has since changed?",
  },
  {
    dot: "#3B3B3B",
    name: "Dark & Twisted",
    question:
      "What's the worst thing you've done that you never told anyone about?",
  },
  {
    dot: "#ffc8c1",
    name: "Funny & Absurd",
    question: "If your life had a laugh track, when would it play the loudest?",
  },
  {
    dot: "#BA1A1A",
    name: "Spicy & Daring",
    question: "What's a fantasy you've never shared out loud?",
  },
];

export default function ProductIntro() {
  const { ref: sectionRef, isIntersecting } =
    useIntersectionObserver<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      className='relative bg-white py-[80px] md:py-[120px] px-5 md:px-8 lg:px-20'
    >
      <div className='max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24'>
        {/* Text content */}
        <div className='flex-1 max-w-[520px]'>
          <span
            className={`inline-block font-body font-medium text-xs tracking-[0.15em] uppercase text-accent-secondary mb-4 transition-all duration-500 ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            THE EXPERIENCE
          </span>

          <h2
            className={`font-heading font-semibold text-text-primary leading-tight mb-6 transition-all duration-600 delay-100 ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            A deck of questions for every moment
          </h2>

          <p
            className={`font-body font-normal text-text-secondary text-base leading-relaxed mb-10 transition-all duration-600 delay-100 ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            From late-night confessions to first-date icebreakers, choose your
            vibe and pull a card. Each question is designed to spark something
            real — laughter, vulnerability, or a story you've never heard
            before.
          </p>

          <div className='flex flex-col gap-4'>
            {features.map((feature, i) => (
              <div
                key={feature.name}
                className={`group flex items-start gap-3 p-3 -mx-3 rounded-xl transition-all duration-400 cursor-default ${
                  isIntersecting
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }`}
                style={{
                  transitionDelay: isIntersecting ? `${200 + i * 80}ms` : "0ms",
                }}
              >
                <span
                  className='w-3 h-3 rounded-full mt-1.5 flex-shrink-0'
                  style={{ backgroundColor: feature.dot }}
                />
                <div>
                  <p className='font-body font-semibold text-sm text-text-primary group-hover:translate-x-1 transition-transform duration-200'>
                    {feature.name}
                  </p>
                  <p className='font-body font-normal text-[13px] italic text-text-secondary mt-0.5'>
                    {feature.question}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card visual */}
        <div
          className={`flex-shrink-0 transition-all duration-800 delay-300 ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div
            className='relative w-[240px] md:w-[280px] h-[360px] md:h-[420px] rounded-3xl bg-white border border-accent-primary/[0.08] layered-shadow animate-float hover:rotate-0 hover:scale-[1.02] transition-all duration-1000'
            style={{
              transform: "rotate(-3deg)",
            }}
          >
            {/* Top gradient area */}
            <div
              className='h-[35%] rounded-t-3xl flex items-center justify-center relative overflow-hidden'
              style={{
                background: "linear-gradient(135deg, #FDF9F6 0%, #FBF2ED 100%)",
              }}
            >
              <HelpCircle className='w-12 h-12 text-accent-secondary/30' />
            </div>

            {/* Question area */}
            <div className='p-6 md:p-8 flex flex-col items-center text-center h-[50%]'>
              <p
                className='font-display font-bold text-accent-primary leading-snug'
                style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
              >
                What is something you love about me that you've never told me?
              </p>
            </div>

            {/* Bottom label */}
            <div className='absolute bottom-5 left-0 right-0 text-center'>
              <span className='font-body font-medium text-[11px] tracking-[0.1em] uppercase text-accent-secondary'>
                Twogether &middot; Deep Deck
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
