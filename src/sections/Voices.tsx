import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface Testimonial {
  quote: string;
  name: string;
  context: string;
  deckName: string;
  deckColor: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "We used the Deep deck on our anniversary. One question led to a three-hour conversation about fears we never knew we shared. It felt like meeting each other again.",
    name: "Maya & Jordan",
    context: "with partner · 4 years",
    deckName: "Deep",
    deckColor: "#635885",
  },
  {
    quote: "The Funny deck saved our group chat from dying. Now we pull a card every Friday night and roast each other mercifully.",
    name: "Theo",
    context: "friends group · 6 months",
    deckName: "Funny",
    deckColor: "#ffc8c1",
  },
  {
    quote: "I sent a Spicy question to someone I'd been too shy to text properly. Their answer made me laugh so hard I snorted. We're dating now.",
    name: "Anonymous",
    context: "new connection",
    deckName: "Spicy",
    deckColor: "#BA1A1A",
  },
];

export default function Voices() {
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg-primary py-[80px] md:py-[120px] px-5 md:px-8 lg:px-20"
    >
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block font-body font-medium text-xs tracking-[0.15em] uppercase text-accent-secondary mb-4 transition-all duration-500 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            VOICES
          </span>
          <h2
            className={`font-heading font-semibold text-text-primary leading-tight transition-all duration-600 delay-100 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
          >
            Real questions, real moments
          </h2>
        </div>

        {/* Testimonials */}
        <div className="flex flex-col gap-6 max-w-[680px] mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-white rounded-[20px] p-7 md:p-8 shadow-card transition-all duration-600 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isIntersecting ? `${120 * i}ms` : '0ms',
              }}
            >
              <p className="font-body font-normal text-base text-text-primary leading-relaxed italic mb-4">
                "{t.quote}"
              </p>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-body font-semibold text-sm text-text-primary">
                    {t.name}
                  </p>
                  <p className="font-body font-normal text-[13px] text-text-secondary">
                    {t.context}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: t.deckColor }}
                  />
                  <span
                    className="font-body font-medium text-[11px] tracking-[0.1em] uppercase"
                    style={{ color: t.deckColor }}
                  >
                    {t.deckName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
