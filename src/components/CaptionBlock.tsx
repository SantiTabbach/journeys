import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

interface CaptionBlockProps {
  caption?: string;
  subcaption?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function CaptionBlock({
  caption,
  subcaption,
  align = 'center',
  className = '',
}: CaptionBlockProps) {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  if (!caption && !subcaption) return null;

  const alignClass =
    align === 'left'
      ? 'text-left'
      : align === 'right'
        ? 'text-right'
        : 'text-center';

  return (
    <div ref={ref} className={`py-8 md:py-12 ${alignClass} ${className}`}>
      {caption && (
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-2xl md:text-4xl lg:text-5xl text-cream font-light tracking-wide"
        >
          {caption}
        </motion.h3>
      )}
      {subcaption && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.7, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-3 md:mt-4 font-sans text-sm md:text-base text-silver font-light tracking-wide max-w-xl mx-auto"
          style={{ textAlign: align }}
        >
          {subcaption}
        </motion.p>
      )}
    </div>
  );
}
