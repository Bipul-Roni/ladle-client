import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import 'swiper/css';
import 'swiper/css/pagination';

// Illustrated bowl, recolored per slide — no external images needed
function Bowl({ broth, garnish, accent }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" aria-hidden="true">
      <ellipse cx="160" cy="232" rx="120" ry="14" fill="rgb(var(--ink) / .08)" />
      <path d="M30 120 Q160 300 290 120 Z" fill="rgb(var(--surface))" stroke="rgb(var(--line))" strokeWidth="3" />
      <ellipse cx="160" cy="120" rx="130" ry="34" fill={broth} />
      <circle cx="110" cy="114" r="14" fill={garnish} />
      <circle cx="150" cy="128" r="10" fill={accent} />
      <circle cx="196" cy="110" r="16" fill={garnish} opacity=".85" />
      <circle cx="226" cy="128" r="8" fill={accent} />
      <path d="M128 102 q8 -10 18 0" stroke={garnish} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M180 132 q8 -10 18 0" stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M120 70 q-12 -18 0 -36 q12 -18 0 -30" stroke="rgb(var(--muted) / .45)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M170 64 q-12 -18 0 -36 q12 -18 0 -30" stroke="rgb(var(--muted) / .35)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M218 72 q-12 -18 0 -36" stroke="rgb(var(--muted) / .3)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="236" y="20" width="12" height="120" rx="6" transform="rotate(28 242 80)" fill="rgb(var(--basil))" />
    </svg>
  );
}

const slides = [
  {
    title: (
      <>
        Tonight, cook{' '}
        <span className="block min-h-[1.2em] text-basil">
          <Typewriter words={['shakshuka', 'chana masala', 'cacio e pepe', 'pozole rojo', 'mapo tofu']} loop cursor cursorStyle="_" typeSpeed={70} deleteSpeed={45} delaySpeed={1600} />
        </span>
      </>
    ),
    text: 'Recipes written by home cooks, with exact ingredients, steps and timing — all in one shared book.',
    cta: { to: '/all-recipes', label: 'Browse recipes' },
    bowl: { broth: 'rgb(var(--paprika) / .85)', garnish: 'rgb(var(--basil))', accent: 'rgb(var(--saffron))' },
  },
  {
    title: 'The family recipe that lives on a sticky note deserves a better home',
    text: 'Add a dish with its cuisine, categories and prep time so anyone can cook it the way you do.',
    cta: { to: '/add-recipe', label: 'Add a recipe' },
    bowl: { broth: 'rgb(var(--saffron) / .9)', garnish: 'rgb(var(--paprika))', accent: 'rgb(var(--basil))' },
  },
  {
    title: 'See what the kitchen keeps coming back to',
    text: 'Every like moves a recipe up. The six most-liked dishes sit right here on the home page.',
    cta: { to: '#top-recipes', label: 'See top recipes' },
    bowl: { broth: 'rgb(var(--basil) / .8)', garnish: 'rgb(var(--saffron))', accent: 'rgb(var(--paprika))' },
  },
];

export default function Banner() {
  return (
    <section className="border-b border-line bg-surface">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        loop
        className="pb-10"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="container-x grid items-center gap-8 py-12 md:grid-cols-[1.15fr_1fr] md:py-20">
              <div>
                <h1 className="text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">{s.title}</h1>
                <p className="mt-5 max-w-lg text-lg text-muted">{s.text}</p>
                {s.cta.to.startsWith('#') ? (
                  <a href={s.cta.to} className="btn-accent mt-8 px-7 py-3 text-base">{s.cta.label}</a>
                ) : (
                  <Link to={s.cta.to} className="btn-accent mt-8 px-7 py-3 text-base">{s.cta.label}</Link>
                )}
              </div>
              <div className="mx-auto aspect-[32/26] w-full max-w-md">
                <Bowl {...s.bowl} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
