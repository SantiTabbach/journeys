import { useEffect, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllImages } from '../data/journeys';

interface FloatingPhoto {
	id: number;
	src: string;
	journeyTitle: string;
	journeyId: string;
	x: number;
	y: number;
	width: number;
	delay: number;
	duration: number;
	opacity: number;
}

const allImages = getAllImages();

function randomBetween(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

let photoIdCounter = 0;

function createPhoto(): FloatingPhoto {
	const img = allImages[Math.floor(Math.random() * allImages.length)];
	return {
		id: photoIdCounter++,
		src: img.src.replace('w=1920', 'w=400'),
		journeyTitle: img.journeyTitle,
		journeyId: img.journeyId,
		x: randomBetween(2, 88),
		y: randomBetween(2, 85),
		width: randomBetween(140, 260),
		delay: randomBetween(0, 0.5),
		duration: randomBetween(18, 30),
		opacity: randomBetween(0.12, 0.3),
	};
}

interface PhotoItemProps {
	photo: FloatingPhoto;
	onHover: (id: number | null) => void;
	isHovered: boolean;
	onClick: (journeyId: string) => void;
}

const PhotoItem = memo(function PhotoItem({
	photo,
	onHover,
	isHovered,
	onClick,
}: PhotoItemProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.85 }}
			animate={{
				opacity: isHovered ? 0.85 : photo.opacity,
				scale: isHovered ? 1.08 : 1,
				y: [0, -randomBetween(15, 40), 0],
			}}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{
				opacity: { duration: 2.5, delay: photo.delay },
				scale: { duration: 0.6, ease: 'easeOut' },
				y: { duration: photo.duration, repeat: Infinity, ease: 'easeInOut' },
			}}
			className="absolute cursor-pointer group"
			style={{
				left: `${photo.x}%`,
				top: `${photo.y}%`,
				width: photo.width,
				zIndex: isHovered ? 50 : 1,
			}}
			onMouseEnter={() => onHover(photo.id)}
			onMouseLeave={() => onHover(null)}
			onClick={() => onClick(photo.journeyId)}
		>
			<div className="relative overflow-hidden rounded-sm shadow-2xl">
				<img
					src={photo.src}
					alt=""
					loading="lazy"
					className="w-full h-auto object-cover block transition-transform duration-700 ease-out"
					style={{
						filter: isHovered ? 'none' : 'grayscale(30%) brightness(0.7)',
					}}
				/>
				<AnimatePresence>
					{isHovered && (
						<motion.div
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 8 }}
							transition={{ duration: 0.3 }}
							className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-linear-to-t from-black/80 to-transparent"
						>
							<span className="text-white/90 text-xs font-sans tracking-wider uppercase">
								{photo.journeyTitle}
							</span>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
});

interface PhotoRainBackgroundProps {
	onPhotoClick?: (journeyId: string) => void;
}

export default function PhotoRainBackground({
	onPhotoClick,
}: PhotoRainBackgroundProps) {
	const [photos, setPhotos] = useState<FloatingPhoto[]>([]);
	const [hoveredId, setHoveredId] = useState<number | null>(null);

	useEffect(() => {
		const initial: FloatingPhoto[] = [];
		const count = Math.min(allImages.length, 18);
		for (let i = 0; i < count; i++) {
			initial.push(createPhoto());
		}
		setPhotos(initial);

		const interval = setInterval(() => {
			setPhotos((prev) => {
				const next = [...prev];
				const replaceIndex = Math.floor(Math.random() * next.length);
				next[replaceIndex] = createPhoto();
				return next;
			});
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const handleHover = useCallback((id: number | null) => {
		setHoveredId(id);
	}, []);

	const handleClick = useCallback(
		(journeyId: string) => {
			onPhotoClick?.(journeyId);
		},
		[onPhotoClick]
	);

	return (
		<div className="absolute inset-0 overflow-hidden">
			<div className="absolute inset-0 bg-linear-to-b from-obsidian/40 via-transparent to-obsidian/80 z-10 pointer-events-none" />
			<AnimatePresence mode="popLayout">
				{photos.map((photo) => (
					<PhotoItem
						key={photo.id}
						photo={photo}
						onHover={handleHover}
						isHovered={hoveredId === photo.id}
						onClick={handleClick}
					/>
				))}
			</AnimatePresence>
		</div>
	);
}
