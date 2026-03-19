import { Product } from './types';

export const BRANDS = ['Nike', 'Jordan', 'Adidas', 'Under Armour', 'Puma', 'New Balance'];
export const SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
export const COLORS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'LeBron 21 "Abalone"',
    brand: 'Nike',
    price: 199.99,
    description: 'The LeBron 21 has a cabling system that works with Zoom Air cushioning and a light, low-to-the-ground design, giving you agile fluidity and explosiveness without excess weight.',
    images: ['https://picsum.photos/seed/lebron21/800/800'],
    sizes: [42, 43, 44, 45, 46],
    colors: ['Green', 'Blue'],
    techSpecs: {
      grip: 'Multi-directional herringbone pattern for elite traction.',
      cushion: 'Zoom Air units in the heel and forefoot.',
      support: 'Flywire cables for a locked-in feel.'
    },
    category: 'performance',
    stock: 15
  },
  {
    id: '2',
    name: 'KD16 "Boardroom"',
    brand: 'Nike',
    price: 159.99,
    description: 'Kevin Durant is a true basketball purist. The KD16 features Nike Air and Zoom Air to provide speed and stability for all four quarters.',
    images: ['https://picsum.photos/seed/kd16/800/800'],
    sizes: [40, 41, 42, 43, 44],
    colors: ['Black', 'Grey'],
    techSpecs: {
      grip: 'Gear-like traction pattern.',
      cushion: 'Bottom-loaded forefoot Zoom Air unit.',
      support: 'Midfoot TPU shank for stability.'
    },
    category: 'performance',
    stock: 10
  },
  {
    id: '3',
    name: 'Curry 11 "Future Curry"',
    brand: 'Under Armour',
    price: 160.00,
    description: 'UA Flow cushioning is totally rubberless, making it light and ridiculously grippy. The UA Warp upper works like mini seat belts locking you in.',
    images: ['https://picsum.photos/seed/curry11/800/800'],
    sizes: [41, 42, 43, 44, 45],
    colors: ['White', 'Black', 'Blue'],
    techSpecs: {
      grip: 'UA Flow technology for insane grip.',
      cushion: 'Full-length UA Flow cushioning.',
      support: 'UA Warp upper for lightweight lockdown.'
    },
    category: 'performance',
    stock: 8
  }
];
