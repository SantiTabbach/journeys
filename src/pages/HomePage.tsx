import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import PhotoRainBackground from '../components/PhotoRainBackground';
import JourneyCard from '../components/JourneyCard';
import { journeys } from '../data/journeys';

export default function HomePage() {
	const navigate = useNavigate();
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	const titleOpacity = useTransform(
		scrollYProgress,
		[0, 0.04, 0.12],
		[1, 1, 0]
	);
	const titleY = useTransform(scrollYProgress, [0, 0.14], ['0vh', '-15vh']);

	const phraseOpacity = useTransform(
		scrollYProgress,
		[0.15, 0.24, 0.5, 0.65],
		[0, 1, 0.85, 0]
	);
	const phraseY = useTransform(
		scrollYProgress,
		[0.15, 0.24, 0.45, 0.7],
		['15vh', '0vh', '-10vh', '-40vh']
	);

	const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
	const fadeOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);

	return (
		<div className="bg-obsidian">
			{/* ===== SCROLL-DRIVEN CINEMATIC SECTION ===== */}
			<div ref={containerRef} className="relative" style={{ height: '400vh' }}>
				<div className="sticky top-0 h-screen w-full overflow-hidden">
					{/* Flying images (behind everything) */}
					<PhotoRainBackground scrollProgress={scrollYProgress} />

					{/* Vignette overlay (above images, below text) */}
					<div
						className="absolute inset-0 z-5 pointer-events-none"
						style={{
							background:
								'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.35) 65%, rgba(10,10,10,0.85) 100%)',
						}}
					/>

					{/* Phase 1: Title */}
					<motion.div
						style={{ opacity: titleOpacity, y: titleY }}
						className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
					>
						<h1 className="font-serif text-5xl md:text-7xl lg:text-[8rem] text-cream font-light tracking-[0.03em] leading-none text-center">
							Santi Tabbach
						</h1>
						<p className="mt-4 md:mt-5 font-sans text-xs md:text-sm text-silver/40 tracking-[0.45em] uppercase font-light text-center">
							Travel Photography
						</p>
					</motion.div>

					{/* Phase 2: Phrase (appears after title, images fly behind it) */}
					<motion.div
						style={{ opacity: phraseOpacity, y: phraseY }}
						className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none"
					>
						<p className="font-serif text-3xl md:text-5xl lg:text-6xl text-cream/80 font-light leading-snug text-center max-w-4xl px-8">
							Not all journeys are meant to be <br /> rushed
						</p>
					</motion.div>

					{/* Scroll cue */}
					<motion.div
						style={{ opacity: scrollCueOpacity }}
						className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
					>
						<span className="font-serif text-base md:text-lg text-cream/25 italic tracking-wide">
							Scroll to explore
						</span>
						<motion.div
							animate={{ y: [0, 8, 0] }}
							transition={{
								duration: 2.5,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						>
							<svg
								width="18"
								height="28"
								viewBox="0 0 18 28"
								fill="none"
								className="text-silver/15"
							>
								<path
									d="M9 0 L9 22 M2 15 L9 22 L16 15"
									stroke="currentColor"
									strokeWidth="1.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</motion.div>
					</motion.div>

					{/* Fade to black transition */}
					<motion.div
						style={{ opacity: fadeOpacity }}
						className="absolute inset-0 z-30 bg-obsidian pointer-events-none"
					/>
				</div>
			</div>

			{/* ===== JOURNEY SELECTOR ===== */}
			<div className="relative z-10 bg-obsidian">
				<div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-40">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-50px' }}
						transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
						className="text-center mb-20 md:mb-32"
					>
						<h2 className="font-serif text-3xl md:text-5xl text-cream/80 font-light tracking-wide">
							The Journeys
						</h2>
						<div className="mt-4 w-12 h-px bg-stone/30 mx-auto" />
					</motion.div>

					<div className="space-y-10 md:space-y-16">
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
						className="text-center mt-28 md:mt-44 pb-16"
					>
						<p className="font-serif text-lg md:text-xl text-stone/40 italic">
							More journeys coming soon
						</p>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
