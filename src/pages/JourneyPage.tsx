import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import StorySection from '../components/StorySection';
import { journeys } from '../data/journeys';

export default function JourneyPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const journey = journeys.find((j) => j.id === id);

	const { scrollYProgress } = useScroll();
	const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	if (!journey) {
		return (
			<div className="h-screen flex items-center justify-center bg-obsidian">
				<div className="text-center">
					<h2 className="font-serif text-3xl text-cream">Journey not found</h2>
					<button
						onClick={() => navigate('/')}
						className="mt-6 font-sans text-sm tracking-widest uppercase text-stone hover:text-cream transition-colors"
					>
						Return home
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-obsidian min-h-screen">
			{/* Progress bar */}
			<motion.div
				style={{ width: progressWidth }}
				className="fixed top-0 left-0 h-[2px] bg-cream/30 z-50"
			/>

			{/* Back button */}
			<motion.button
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5, duration: 0.8 }}
				onClick={() => navigate('/')}
				className="fixed top-6 left-6 md:top-8 md:left-8 z-40 font-sans text-xs tracking-[0.3em] uppercase text-silver/50 hover:text-cream transition-colors duration-300"
			>
				← Back
			</motion.button>

			{/* ===== HERO INTRO ===== */}
			<section className="relative h-screen flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0">
					<motion.img
						src={journey.heroImage}
						alt={journey.title}
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
						{journey.location}
					</motion.span>

					<motion.h1
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.2, delay: 1 }}
						className="mt-4 font-serif text-5xl md:text-7xl lg:text-9xl text-white font-light tracking-wide"
					>
						{journey.title}
					</motion.h1>

					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						transition={{ duration: 1, delay: 1.4 }}
						className="mt-6 block font-sans text-sm md:text-base text-silver tracking-widest"
					>
						{journey.date}
					</motion.span>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, delay: 2 }}
						className="mt-16"
					>
						<motion.div
							animate={{ y: [0, 8, 0] }}
							transition={{
								duration: 2.5,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
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

			{/* ===== STORY MOMENTS ===== */}
			<div className="relative z-10 space-y-24 md:space-y-40 py-24 md:py-40">
				{journey.moments.map((moment, index) => (
					<StorySection key={moment.id} moment={moment} index={index} />
				))}
			</div>

			{/* ===== END / FOOTER ===== */}
			<section className="relative py-32 md:py-48">
				<div className="text-center px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 1.2 }}
					>
						<div className="w-12 h-px bg-stone/30 mx-auto mb-10" />
						<p className="font-serif text-2xl md:text-4xl text-cream/60 font-light italic">
							End of journey
						</p>
						<p className="mt-4 font-sans text-sm text-stone/50 tracking-widest">
							{journey.title} — {journey.year}
						</p>
					</motion.div>

					<motion.button
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1, delay: 0.5 }}
						onClick={() => navigate('/')}
						className="mt-12 font-sans text-xs tracking-[0.3em] uppercase text-stone/50 hover:text-cream transition-colors duration-500"
					>
						← All journeys
					</motion.button>
				</div>
			</section>
		</div>
	);
}
