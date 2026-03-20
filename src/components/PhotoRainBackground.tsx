import { useMemo } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { getAllImages } from '../data/journeys';

interface FlyingPhoto {
	id: number;
	src: string;
	angle: number;
	distance: number;
	size: number;
	delay: number;
}

const allImages = getAllImages();

function seededRandom(seed: number) {
	const x = Math.sin(seed * 9301 + 49297) * 49297;
	return x - Math.floor(x);
}

function generatePhotos(count: number): FlyingPhoto[] {
	const photos: FlyingPhoto[] = [];

	for (let i = 0; i < count; i++) {
		const imgIndex = Math.floor(seededRandom(i + 1) * allImages.length);
		const img = allImages[imgIndex % allImages.length];
		const rand = (n: number) => seededRandom(i * 100 + n);

		const angle = (i / count) * Math.PI * 2 + (rand(10) - 0.5) * 0.4;

		photos.push({
			id: i,
			src: img.src.replace('w=1920', 'w=600'),
			angle,
			distance: 35 + rand(1) * 40,
			size: 10 + rand(3) * 8,
			delay: rand(6) * 0.2,
		});
	}

	return photos;
}

interface FlyingPhotoItemProps {
	photo: FlyingPhoto;
	scrollProgress: MotionValue<number>;
	index: number;
	total: number;
}

function FlyingPhotoItem({
	photo,
	scrollProgress,
	index,
	total,
}: FlyingPhotoItemProps) {
	const stagger = photo.delay + (index / total) * 0.12;

	const preloadAt = 0.1;
	const visibleAt = 0.18;
	const flyStart = 0.24 + stagger;
	const flyEnd = 0.5 + stagger * 0.6;
	const exitAt = Math.min(flyEnd + 0.1, 0.85);

	const tx = Math.cos(photo.angle) * photo.distance;
	const ty = Math.sin(photo.angle) * photo.distance * 0.55;

	const x = useTransform(
		scrollProgress,
		[0, preloadAt, visibleAt, flyStart, flyEnd, exitAt],
		[
			`0vw`,
			`${tx * 0.04}vw`,
			`${tx * 0.1}vw`,
			`${tx * 0.2}vw`,
			`${tx}vw`,
			`${tx * 1.25}vw`,
		]
	);

	const y = useTransform(
		scrollProgress,
		[0, preloadAt, visibleAt, flyStart, flyEnd, exitAt],
		[
			`0vh`,
			`${ty * 0.04}vh`,
			`${ty * 0.1}vh`,
			`${ty * 0.2}vh`,
			`${ty}vh`,
			`${ty * 1.25}vh`,
		]
	);

	const scale = useTransform(
		scrollProgress,
		[0, preloadAt - 0.01, preloadAt, visibleAt, flyStart, flyEnd, exitAt],
		[0, 0, 0.08, 0.15, 0.22, 1.2, 1.8]
	);

	const opacity = useTransform(
		scrollProgress,
		[
			0,
			preloadAt - 0.01,
			preloadAt,
			visibleAt,
			flyEnd * 0.6,
			exitAt - 0.04,
			exitAt,
		],
		[0, 0, 0.15, 0.7, 0.9, 0.5, 0]
	);

	const rotateEnd = (seededRandom(photo.id * 77) - 0.5) * 6;
	const rotate = useTransform(
		scrollProgress,
		[0, preloadAt, flyEnd],
		[0, 0, rotateEnd]
	);

	return (
		<motion.div
			className="absolute pointer-events-none"
			style={{
				left: '50%',
				top: '50%',
				marginLeft: `${-photo.size / 2}vw`,
				marginTop: `${(-photo.size * 0.75) / 2}vw`,
				width: `${photo.size}vw`,
				height: `${photo.size * 0.75}vw`,
				x,
				y,
				scale,
				opacity,
				rotate,
				willChange: 'transform, opacity',
			}}
		>
			<img
				src={photo.src}
				alt=""
				loading="lazy"
				decoding="async"
				className="w-full h-full object-cover rounded-sm"
				style={{
					filter: 'brightness(0.75) contrast(1.1)',
					boxShadow: '0 2px 30px rgba(0,0,0,0.5)',
				}}
			/>
		</motion.div>
	);
}

interface PhotoRainBackgroundProps {
	scrollProgress: MotionValue<number>;
}

export default function PhotoRainBackground({
	scrollProgress,
}: PhotoRainBackgroundProps) {
	const photos = useMemo(() => generatePhotos(16), []);

	return (
		<div className="absolute inset-0 z-1 overflow-hidden">
			{photos.map((photo, i) => (
				<FlyingPhotoItem
					key={photo.id}
					photo={photo}
					scrollProgress={scrollProgress}
					index={i}
					total={photos.length}
				/>
			))}
		</div>
	);
}
