import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface DeckData {
  badge: string;
  badgeBg: string;
  badgeText: string;
  heading: string;
  body: string;
  example: string;
  gradient: string;
  textOnGradient: string;
  deckLabel: string;
}

const decks: DeckData[] = [
  {
    badge: "Deep",
    badgeBg: "#635885",
    badgeText: "#FFFFFF",
    heading: "Go beneath the surface",
    body: "Questions that invite vulnerability. Not therapy — just realness. For friends, partners, and anyone you want to truly know.",
    example: "What part of yourself are you most afraid I'll misunderstand?",
    gradient: "linear-gradient(135deg, #635885 0%, #3F3855 100%)",
    textOnGradient: "#FFFFFF",
    deckLabel: "Deep Deck",
  },
  {
    badge: "Funny",
    badgeBg: "#ffc8c1",
    badgeText: "#FFFFFF",
    heading: "Laugh until it hurts",
    body: "Absurd, ridiculous, and unexpectedly insightful. The kind of questions that turn a quiet room into a comedy show.",
    example:
      "If we started a band right now, what would we be called and why would we break up in a week?",
    gradient: "linear-gradient(135deg, #ffc8c1 0%, #F28C82 100%)",
    textOnGradient: "#FFFFFF",
    deckLabel: "Funny Deck",
  },
  {
    badge: "Dark",
    badgeBg: "#3B3B3B",
    badgeText: "#FFFFFF",
    heading: "Shadows and secrets",
    body: "For the conversations that happen at 2am. Uncomfortable, revealing, and strangely freeing.",
    example:
      "What's a lie you've told so many times you almost believe it yourself?",
    gradient: "linear-gradient(135deg, #3B3B3B 0%, #1A1A1A 100%)",
    textOnGradient: "#FFFFFF",
    deckLabel: "Dark Deck",
  },
  {
    badge: "Spicy",
    badgeBg: "#BA1A1A",
    badgeText: "#FFFFFF",
    heading: "Turn up the heat",
    body: "Daring, flirtatious, and delightfully uncomfortable. For when you're ready to stop playing it safe.",
    example:
      "What's something you've always wanted to try but never had the courage to suggest?",
    gradient: "linear-gradient(135deg, #BA1A1A 0%, #8E1414 100%)",
    textOnGradient: "#FFFFFF",
    deckLabel: "Spicy Deck",
  },
];

function DeckCard({ deck, index }: { deck: DeckData; index: number }) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.15,
  });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
    >
      {/* Text block */}
      <div className={`flex-1 max-w-[480px] ${isEven ? "" : "lg:text-right"}`}>
        <span
          className={`inline-block font-body font-semibold text-xs rounded-full px-3 py-1 mb-4 transition-all duration-700 ${
            isIntersecting
              ? "opacity-100 translate-x-0"
              : `opacity-0 ${isEven ? "-translate-x-8" : "translate-x-8"}`
          }`}
          style={{
            backgroundColor: deck.badgeBg,
            color: deck.badgeText,
            transitionDelay: isIntersecting ? "0ms" : "0ms",
          }}
        >
          {deck.badge}
        </span>

        <h3
          className={`font-heading font-semibold text-2xl md:text-[32px] text-text-primary mb-4 transition-all duration-700 delay-100 ${
            isIntersecting
              ? "opacity-100 translate-x-0"
              : `opacity-0 ${isEven ? "-translate-x-8" : "translate-x-8"}`
          }`}
        >
          {deck.heading}
        </h3>

        <p
          className={`font-body font-normal text-base text-text-secondary leading-relaxed mb-6 transition-all duration-700 delay-150 ${
            isIntersecting
              ? "opacity-100 translate-x-0"
              : `opacity-0 ${isEven ? "-translate-x-8" : "translate-x-8"}`
          }`}
        >
          {deck.body}
        </p>

        <blockquote
          className={`border-l-[3px] pl-4 transition-all duration-700 delay-200 ${
            isIntersecting
              ? "opacity-100 translate-x-0"
              : `opacity-0 ${isEven ? "-translate-x-8" : "translate-x-8"}`
          }`}
          style={{ borderColor: deck.badgeBg }}
        >
          <p
            className='font-display font-bold text-xl md:text-[20px] leading-snug'
            style={{ color: deck.badgeBg }}
          >
            {deck.example}
          </p>
        </blockquote>
      </div>

      {/* Visual card */}
      <div
        className={`flex-shrink-0 transition-all duration-800 delay-200 ${
          isIntersecting
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div
          className='relative w-[200px] md:w-[240px] h-[300px] md:h-[360px] rounded-3xl overflow-hidden layered-shadow animate-float hover:rotate-0 hover:scale-[1.02] transition-all duration-1000'
          style={{
            transform: isEven ? "rotate(3deg)" : "rotate(-3deg)",
            background: deck.gradient,
          }}
        >
          {/* Question text */}
          <div className='absolute inset-0 flex flex-col items-center justify-center p-6 text-center'>
            <p
              className='font-display font-bold leading-snug'
              style={{
                color: deck.textOnGradient,
                fontSize: "clamp(16px, 2vw, 22px)",
              }}
            >
              {deck.example}
            </p>
          </div>

          {/* Deck label */}
          <div className='absolute bottom-5 left-0 right-0 text-center'>
            <span
              className='font-body font-medium text-[11px] tracking-[0.1em] uppercase'
              style={{
                color: deck.textOnGradient,
                opacity: 0.7,
              }}
            >
              Twogether &middot; {deck.deckLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Decks() {
  const { ref: headerRef, isIntersecting: headerVisible } =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className='relative bg-white py-[80px] md:py-[120px] px-5 md:px-8 lg:px-20'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div ref={headerRef} className='text-center mb-20'>
          <span
            className={`inline-block font-body font-medium text-xs tracking-[0.15em] uppercase text-accent-secondary mb-4 transition-all duration-500 ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            THE DECKS
          </span>
          <h2
            className={`font-heading font-semibold text-text-primary leading-tight mb-4 transition-all duration-600 delay-100 ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            Four flavors of conversation
          </h2>
          <p
            className={`font-body font-normal text-base text-text-secondary max-w-[560px] mx-auto leading-relaxed transition-all duration-600 delay-150 ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            Each deck is crafted by psychologists, comedians, and people who've
            stayed up too late talking.
          </p>
        </div>

        {/* Decks */}
        <div className='flex flex-col gap-20 md:gap-[100px]'>
          {decks.map((deck, i) => (
            <DeckCard key={deck.badge} deck={deck} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
