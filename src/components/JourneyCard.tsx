import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import type { Journey } from '../data/journeys';

interface JourneyCardProps {
	journey: Journey;
	index: number;
	onClick: () => void;
}

export default function JourneyCard({
	journey,
	index,
	onClick,
}: JourneyCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const { ref: inViewRef, isInView } = useInView({ threshold: 0.15 });

	const { scrollYProgress } = useScroll({
		target: cardRef,
		offset: ['start end', 'end start'],
	});

	const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

	return (
		<motion.div
			ref={cardRef}
			initial={{ opacity: 0, y: 80 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
			transition={{
				duration: 1,
				delay: index * 0.15,
				ease: [0.25, 0.46, 0.45, 0.94],
			}}
			className="group cursor-pointer"
			onClick={onClick}
		>
			<div
				ref={inViewRef}
				className="relative overflow-hidden rounded-sm aspect-video md:aspect-21/9"
			>
				<motion.div style={{ y: imageY }} className="absolute inset-[-10%]">
					<img
						src={journey.coverImage}
						alt={journey.title}
						loading="lazy"
						className="w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:brightness-110"
						style={{ filter: 'brightness(0.55)' }}
					/>
				</motion.div>

				<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

				<div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
					>
						<span className="font-sans text-xs md:text-sm text-silver/80 tracking-[0.25em] uppercase">
							{journey.location}
						</span>
						<h2 className="mt-2 font-serif text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide">
							{journey.title}
							<span className="text-silver/60 ml-3 md:ml-5 font-sans text-base md:text-xl font-light">
								{journey.year}
							</span>
						</h2>
						<p className="mt-2 md:mt-3 text-sm text-silver/60 font-light max-w-md tracking-wide">
							{journey.description}
						</p>
					</motion.div>

					<motion.div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
						<span className="font-sans text-xs tracking-[0.3em] uppercase text-white/70">
							View journey →
						</span>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}
