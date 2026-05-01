import { Layers, Shuffle, Heart } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const steps = [
  {
    icon: Layers,
    title: 'Pick a deck',
    description: 'Deep, Funny, Dark, Spicy — each deck has a personality. Match it to your mood.',
  },
  {
    icon: Shuffle,
    title: 'Pull a question',
    description: 'Swipe through the deck or let fate decide. Every card is a doorway.',
  },
  {
    icon: Heart,
    title: 'Send & connect',
    description: 'Text it, read it aloud, or play it over dinner. The question does the work.',
  },
];

export default function HowItWorks() {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-bg-primary py-[80px] md:py-[120px] px-5 md:px-8 lg:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block font-body font-medium text-xs tracking-[0.15em] uppercase text-accent-secondary mb-4 transition-all duration-500 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            HOW IT WORKS
          </span>
          <h2
            className={`font-heading font-semibold text-text-primary leading-tight transition-all duration-600 delay-100 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
          >
            Three taps to something real
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={`bg-white rounded-3xl p-8 md:p-10 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 ease-out ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: isIntersecting ? `${150 + i * 150}ms` : '0ms',
                }}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-full bg-bg-primary flex items-center justify-center mb-6 ${
                    isIntersecting ? 'scale-100' : 'scale-90'
                  }`}
                  style={{
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: isIntersecting ? `${200 + i * 150}ms` : '0ms',
                  }}
                >
                  <Icon className="w-6 h-6 text-accent-primary" />
                </div>

                <h3 className="font-heading font-semibold text-xl text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="font-body font-normal text-[15px] text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
