import { motion, useScroll, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';

interface JourneyLayoutProps {
  children: ReactNode;
  heroImage: string;
  title: string;
  location: string;
  date: string;
}

export default function JourneyLayout({
  children,
  heroImage,
  title,
  location,
  date,
}: JourneyLayoutProps) {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="bg-obsidian min-h-screen">
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 h-[2px] bg-cream/30 z-50"
      />

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroImage}
            alt={title}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/40 to-obsidian/20" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-silver/60"
          >
            {location}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="mt-4 font-serif text-5xl md:text-7xl lg:text-9xl text-white font-light tracking-wide"
          >
            {title}
          </motion.h1>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-6 block font-sans text-sm md:text-base text-silver tracking-widest"
          >
            {date}
          </motion.span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                width="20"
                height="30"
                viewBox="0 0 20 30"
                fill="none"
                className="mx-auto text-silver/30"
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
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 space-y-24 md:space-y-40 py-24 md:py-40">
        {children}
      </div>
    </div>
  );
}
