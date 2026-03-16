import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PageTransitionProps {
	children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={location.pathname}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
			>
				<motion.div
					initial={{ opacity: 1 }}
					animate={{ opacity: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="fixed inset-0 bg-obsidian z-100 pointer-events-none"
				/>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
