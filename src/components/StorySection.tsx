import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import ParallaxImage from './ParallaxImage';
import CaptionBlock from './CaptionBlock';
import type { Moment } from '../data/journeys';

interface StorySectionProps {
	moment: Moment;
	index: number;
}

export default function StorySection({ moment, index }: StorySectionProps) {
	const { ref, isInView } = useInView({ threshold: 0.1 });

	const captionAlign =
		index % 3 === 0 ? 'center' : index % 3 === 1 ? 'left' : 'right';

	if (moment.type === 'full') {
		return (
			<section ref={ref} className="relative">
				<CaptionBlock
					caption={moment.caption}
					subcaption={moment.subcaption}
					align={captionAlign}
					className="px-6 md:px-16 max-w-4xl mx-auto"
				/>
				<div className="relative w-full h-[70vh] md:h-[90vh]">
					<ParallaxImage
						src={moment.images[0]}
						speed={0.12}
						className="absolute inset-0"
						overlay
					/>
				</div>
			</section>
		);
	}

	if (moment.type === 'vertical') {
		return (
			<section ref={ref} className="relative px-6 md:px-16 lg:px-32">
				<CaptionBlock
					caption={moment.caption}
					subcaption={moment.subcaption}
					align={captionAlign}
					className="max-w-3xl mx-auto"
				/>
				<motion.div
					initial={{ opacity: 0, y: 60 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
					transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
					className="max-w-2xl mx-auto"
				>
					<div className="relative aspect-3/4 overflow-hidden rounded-sm">
						<img
							src={moment.images[0]}
							alt={moment.caption || ''}
							loading="lazy"
							className="w-full h-full object-cover"
						/>
					</div>
				</motion.div>
			</section>
		);
	}

	if (moment.type === 'side-by-side') {
		return (
			<section ref={ref} className="relative px-6 md:px-12 lg:px-20">
				<CaptionBlock
					caption={moment.caption}
					subcaption={moment.subcaption}
					align="center"
					className="max-w-3xl mx-auto"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 max-w-7xl mx-auto">
					{moment.images.map((img, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 50, x: i === 0 ? -30 : 30 }}
							animate={
								isInView
									? { opacity: 1, y: 0, x: 0 }
									: { opacity: 0, y: 50, x: i === 0 ? -30 : 30 }
							}
							transition={{
								duration: 1.2,
								delay: i * 0.2,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
							className="relative aspect-4/3 overflow-hidden rounded-sm"
						>
							<img
								src={img}
								alt={moment.caption || ''}
								loading="lazy"
								className="w-full h-full object-cover"
							/>
						</motion.div>
					))}
				</div>
			</section>
		);
	}

	if (moment.type === 'detail') {
		return (
			<section ref={ref} className="relative px-6 md:px-16">
				<CaptionBlock
					caption={moment.caption}
					subcaption={moment.subcaption}
					align={captionAlign}
					className="max-w-3xl mx-auto"
				/>
				<motion.div
					initial={{ opacity: 0, scale: 0.92 }}
					animate={
						isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }
					}
					transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
					className="max-w-4xl mx-auto"
				>
					<div className="relative aspect-16/10 overflow-hidden rounded-sm">
						<img
							src={moment.images[0]}
							alt={moment.caption || ''}
							loading="lazy"
							className="w-full h-full object-cover"
						/>
					</div>
				</motion.div>
			</section>
		);
	}

	return null;
}
