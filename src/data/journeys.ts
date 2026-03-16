export interface Moment {
  id: string;
  type: 'full' | 'vertical' | 'side-by-side' | 'detail';
  images: string[];
  caption?: string;
  subcaption?: string;
}

export interface Journey {
  id: string;
  title: string;
  location: string;
  country: string;
  year: number;
  date: string;
  heroImage: string;
  coverImage: string;
  description: string;
  moments: Moment[];
}

const UNSPLASH = (id: string, w = 1920) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const journeys: Journey[] = [
  {
    id: 'japan-2026',
    title: 'Japan',
    location: 'Kyoto · Nagano · Tokyo',
    country: 'Japan',
    year: 2026,
    date: 'January 2026',
    heroImage: UNSPLASH('photo-1493976040374-85c8e12f0c0e'),
    coverImage: UNSPLASH('photo-1493976040374-85c8e12f0c0e'),
    description: 'A winter journey through ancient temples, cedar forests, and neon-lit streets.',
    moments: [
      {
        id: 'jp-1',
        type: 'full',
        images: [UNSPLASH('photo-1545569341-9eb8b30979d9')],
        caption: 'Arrival in Kyoto',
        subcaption: 'The ancient capital welcomed us with silence and snow.',
      },
      {
        id: 'jp-2',
        type: 'side-by-side',
        images: [
          UNSPLASH('photo-1528360983277-13d401cdc186'),
          UNSPLASH('photo-1504198453319-5ce911bafcde'),
        ],
        caption: 'Walking through the old streets',
      },
      {
        id: 'jp-3',
        type: 'vertical',
        images: [UNSPLASH('photo-1542051841857-5f90071e7989')],
        caption: 'The bamboo grove in Arashiyama',
        subcaption: 'Light filtering through ten thousand stalks.',
      },
      {
        id: 'jp-4',
        type: 'detail',
        images: [UNSPLASH('photo-1490806843957-31f4c9a91c65')],
        caption: 'Morning light at the temple',
      },
      {
        id: 'jp-5',
        type: 'full',
        images: [UNSPLASH('photo-1480796927426-f609979314bd')],
        caption: 'Tokyo at dusk',
        subcaption: 'Where tradition meets the electric glow of the future.',
      },
      {
        id: 'jp-6',
        type: 'side-by-side',
        images: [
          UNSPLASH('photo-1551632811-561732d1e306'),
          UNSPLASH('photo-1526481280693-3bfa7568e0f8'),
        ],
        caption: 'Details of daily life',
      },
    ],
  },
  {
    id: 'patagonia-2024',
    title: 'Patagonia',
    location: 'Torres del Paine · El Chaltén',
    country: 'Argentina & Chile',
    year: 2024,
    date: 'March 2024',
    heroImage: UNSPLASH('photo-1509023464722-18d996393ca8'),
    coverImage: UNSPLASH('photo-1509023464722-18d996393ca8'),
    description: 'The edge of the world, where mountains meet infinite sky.',
    moments: [
      {
        id: 'pt-1',
        type: 'full',
        images: [UNSPLASH('photo-1464822759023-fed622ff2c3b')],
        caption: 'First light on the towers',
        subcaption: 'We hiked through darkness to witness this moment.',
      },
      {
        id: 'pt-2',
        type: 'vertical',
        images: [UNSPLASH('photo-1483728642387-6c3bdd6c93e5')],
        caption: 'Glacial waters',
      },
      {
        id: 'pt-3',
        type: 'side-by-side',
        images: [
          UNSPLASH('photo-1506905925346-21bda4d32df4'),
          UNSPLASH('photo-1454496522488-7a8e488e8606'),
        ],
        caption: 'The vast and the intimate',
      },
      {
        id: 'pt-4',
        type: 'full',
        images: [UNSPLASH('photo-1486870591958-9b9d0d1dda99')],
        caption: 'Sunset at Fitz Roy',
        subcaption: 'The mountain glowed like it was on fire.',
      },
    ],
  },
  {
    id: 'iceland-2023',
    title: 'Iceland',
    location: 'Reykjavik · Vik · Jökulsárlón',
    country: 'Iceland',
    year: 2023,
    date: 'September 2023',
    heroImage: UNSPLASH('photo-1504893524553-b855bce32c67'),
    coverImage: UNSPLASH('photo-1504893524553-b855bce32c67'),
    description: 'Fire, ice, and the most dramatic light on Earth.',
    moments: [
      {
        id: 'ic-1',
        type: 'full',
        images: [UNSPLASH('photo-1476610182048-b716b8515aaa')],
        caption: 'The black sand beach',
        subcaption: 'Where the Atlantic crashes against volcanic shores.',
      },
      {
        id: 'ic-2',
        type: 'vertical',
        images: [UNSPLASH('photo-1520769669658-f07657f5a307')],
        caption: 'Waterfall in the highlands',
      },
      {
        id: 'ic-3',
        type: 'side-by-side',
        images: [
          UNSPLASH('photo-1531366936337-7c912a4589a7'),
          UNSPLASH('photo-1494783367193-149034c05e8f'),
        ],
        caption: 'Northern lights and glacial lagoon',
      },
      {
        id: 'ic-4',
        type: 'full',
        images: [UNSPLASH('photo-1474557157379-8aa74a6ef541')],
        caption: 'The road ahead',
        subcaption: 'Every turn revealed a new world.',
      },
    ],
  },
];

export const getAllImages = (): { src: string; journeyId: string; journeyTitle: string }[] => {
  const images: { src: string; journeyId: string; journeyTitle: string }[] = [];
  journeys.forEach((journey) => {
    images.push({ src: journey.heroImage, journeyId: journey.id, journeyTitle: journey.title });
    journey.moments.forEach((moment) => {
      moment.images.forEach((img) => {
        images.push({ src: img, journeyId: journey.id, journeyTitle: journey.title });
      });
    });
  });
  return images;
};
