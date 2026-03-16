import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import PhotoRainBackground from '../components/PhotoRainBackground';
import JourneyCard from '../components/JourneyCard';
import { journeys } from '../data/journeys';

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const journeySectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const handlePhotoClick = useCallback(
    (journeyId: string) => {
      navigate(`/journey/${journeyId}`);
    },
    [navigate]
  );

  const handleEnterClick = () => {
    journeySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-obsidian">
      {/* ===== HERO / LANDING ===== */}
      <motion.div
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <PhotoRainBackground onPhotoClick={handlePhotoClick} />

        <div className="relative z-20 text-center pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-[0.04em] leading-tight">
              Santiago Tabbach
            </h1>
            <p className="mt-4 font-sans text-sm md:text-base text-silver/70 tracking-[0.35em] uppercase font-light">
              Travel Photography
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            onClick={handleEnterClick}
            className="mt-16 md:mt-20 pointer-events-auto group"
          >
            <span className="font-serif text-lg md:text-xl text-cream/50 italic tracking-wide group-hover:text-cream/90 transition-colors duration-500">
              Enter the journeys
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-4 flex justify-center"
            >
              <svg
                width="20"
                height="30"
                viewBox="0 0 20 30"
                fill="none"
                className="text-silver/30 group-hover:text-silver/60 transition-colors duration-500"
              >
                <path
                  d="M10 0 L10 24 M3 17 L10 24 L17 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* ===== JOURNEY SELECTOR ===== */}
      <div
        ref={journeySectionRef}
        className="relative z-10 min-h-screen bg-obsidian"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="font-sans text-xs tracking-[0.4em] uppercase text-stone">
              Select a journey
            </span>
          </motion.div>

          <div className="space-y-8 md:space-y-12">
            {journeys.map((journey, index) => (
              <JourneyCard
                key={journey.id}
                journey={journey}
                index={index}
                onClick={() => navigate(`/journey/${journey.id}`)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mt-24 md:mt-40 pb-12"
          >
            <p className="font-serif text-lg md:text-xl text-stone/50 italic">
              More journeys coming soon
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
