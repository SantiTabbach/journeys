import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from '../hooks/useInView';

interface ParallaxImageProps {
	src: string;
	alt?: string;
	speed?: number;
	className?: string;
	overlay?: boolean;
}

export default function ParallaxImage({
	src,
	alt = '',
	speed = 0.15,
	className = '',
	overlay = false,
}: ParallaxImageProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { ref: inViewRef, isInView } = useInView({
		threshold: 0.05,
		once: true,
	});

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});

	const y = useTransform(
		scrollYProgress,
		[0, 1],
		[`${-speed * 100}%`, `${speed * 100}%`]
	);

	return (
		<div ref={containerRef} className={`relative overflow-hidden ${className}`}>
			<div ref={inViewRef} className="absolute inset-0">
				<motion.div
					style={{ y }}
					className="absolute inset-[-15%] will-change-transform"
				>
					<motion.img
						src={src}
						alt={alt}
						loading="lazy"
						initial={{ scale: 1.15, opacity: 0 }}
						animate={
							isInView ? { scale: 1, opacity: 1 } : { scale: 1.15, opacity: 0 }
						}
						transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
						className="w-full h-full object-cover"
					/>
				</motion.div>
				{overlay && (
					<div className="absolute inset-0 bg-linear-to-t from-obsidian/60 via-transparent to-obsidian/20 pointer-events-none" />
				)}
			</div>
		</div>
	);
}
