import { Product, Review, Ingredient } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Hydrating Shampoo',
    subtitle: 'Deep Cleanses Scalp & Hydrates Hair',
    step: 'Step 1',
    tag: 'Step 1: Cleanse',
    price: 14.99,
    originalPrice: 18.00,
    rating: 4.9,
    reviewsCount: 1240,
    image: '/assets/hair-type-curly.jpg',
    description: 'Sulfate-free scalp cleanser that gently removes buildup while infusing hair shafts with moisture. Hyaluronic Acid draws hydration directly into the scalp and cuticle.',
    keyIngredients: ['Hyaluronic Acid', 'Pure Coconut Water', 'Aloe Vera Leaf Extract'],
    hairTypes: ['Type 2 Wavy', 'Type 3 Curly', 'Type 4 Coily'],
    size: '300ml / 10.1 fl oz',
    benefits: [
      'Gently purifies scalp without stripping natural lipids',
      'Infuses moisture at the core of each hair strand',
      '0% Sulfates, 0% Silicones, 0% Parabens'
    ]
  },
  {
    id: 2,
    name: 'Hydrating Conditioner',
    subtitle: 'Intense Detangling & Moisture Infusion',
    step: 'Step 2',
    tag: 'Step 2: Condition',
    price: 15.99,
    originalPrice: 19.50,
    rating: 4.8,
    reviewsCount: 980,
    image: '/assets/hair-type-wavy.jpg',
    description: 'Instant knot releasing conditioner designed for Arab hair textures. Seals the cuticle layer to lock in hydration and prevent humidity-induced frizz.',
    keyIngredients: ['Hyaluronic Acid', 'Avocado Oil', 'Shea Butter'],
    hairTypes: ['Type 2 Wavy', 'Type 3 Curly', 'Type 4 Coily'],
    size: '300ml / 10.1 fl oz',
    benefits: [
      'Melt-away detangling formulation for effortless combing',
      'Smooths dry cuticles for high-shine bounce',
      'Dermatologically tested on sensitive scalps'
    ]
  },
  {
    id: 3,
    name: 'Deep Hydrating Mask',
    subtitle: 'Weekly Intense Hydration & Repair',
    step: 'Step 3',
    tag: 'Step 3: Nourish',
    price: 18.99,
    originalPrice: 24.00,
    rating: 4.95,
    reviewsCount: 1510,
    image: '/assets/feature-card-1.jpg',
    description: 'Ultra-rich weekly treatment mask engineered for thirsty curls. Delivers 48 hours of continuous moisture retention and strengthens fragile curl bends.',
    keyIngredients: ['Hyaluronic Acid', 'Virgin Coconut Oil', 'Hydrolyzed Silk Protein'],
    hairTypes: ['Type 2 Wavy', 'Type 3 Curly', 'Type 4 Coily'],
    size: '250ml / 8.5 fl oz',
    benefits: [
      'Restores elasticity and repairs split ends',
      'Provides 48H clinically proven moisture lock',
      'Deeply conditions high porosity and color-treated curls'
    ]
  },
  {
    id: 4,
    name: 'Curl Defining Leave-In Cream',
    subtitle: 'All-Day Frizz Control & Soft Curls',
    step: 'Step 4',
    tag: 'Step 4: Define',
    price: 16.99,
    originalPrice: 21.00,
    rating: 4.9,
    reviewsCount: 2100,
    image: '/assets/hair-type-coily.jpg',
    description: 'Lightweight nourishing cream that clumps curl patterns effortlessly. Provides touchable softness and 24-hour humidity shielding without crunch.',
    keyIngredients: ['Hyaluronic Acid', 'Coconut Milk', 'Botanical Glycerin'],
    hairTypes: ['Type 2 Wavy', 'Type 3 Curly', 'Type 4 Coily'],
    size: '200ml / 6.7 fl oz',
    benefits: [
      'Enhances natural curl clumps and wave patterns',
      'Weightless moisture with zero sticky residue',
      'Heat & environmental humidity protection'
    ]
  },
  {
    id: 5,
    name: 'Hydra Hold Curl Gel',
    subtitle: 'Long-Lasting Cast Without Crunch',
    step: 'Step 5',
    tag: 'Step 5: Lock & Hold',
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.85,
    reviewsCount: 1150,
    image: '/assets/hair-type-curly.jpg',
    description: 'Flexible-hold gel cast builder that locks in hydration for up to 48 hours. Scrunch out the crunch for glossy, defined, weather-proof curls.',
    keyIngredients: ['Hyaluronic Acid', 'Flaxseed Extract', 'Pro-Vitamin B5'],
    hairTypes: ['Type 2 Wavy', 'Type 3 Curly', 'Type 4 Coily'],
    size: '200ml / 6.7 fl oz',
    benefits: [
      'Strong flexible hold with zero flaking',
      'Seals hydration inside curl structures',
      'Easy to scrunch out for touchably soft volume'
    ]
  }
];

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'hyaluronic',
    name: 'Hyaluronic Acid',
    subtitle: 'Moisture Magnet',
    icon: 'Droplet',
    description: 'Acts like a sponge, attracting up to 1,000 times its weight in water to fill hair cuticles with long-lasting hydration.',
    benefits: [
      'Pulls atmospheric moisture directly into dry curl strands',
      'Smooths porous cuticles for 48-hour frizz control',
      'Increases curl elasticity and prevents snap breakage'
    ],
    scientificFact: 'Proven to increase hair moisture retention by 240% compared to untreated hair.'
  },
  {
    id: 'coconut',
    name: 'Pure Coconut Water & Oil',
    subtitle: 'Deep Nourishment',
    icon: 'Sparkles',
    description: 'Rich in essential fatty acids and lauric acid that penetrate deep into the hair shaft rather than sitting on top.',
    benefits: [
      'Penetrates cortex to replenish lost lipid moisture',
      'Protects scalp microbiome from dry irritation',
      'Imparts natural gloss and silky touchability'
    ],
    scientificFact: 'Lauric acid has a low molecular weight, allowing deep penetration into hair fiber.'
  },
  {
    id: 'avocado',
    name: 'Avocado & Botanical Extracts',
    subtitle: 'Elasticity & Shine',
    icon: 'ShieldCheck',
    description: 'Packed with Oleic Acid, Vitamin E, and antioxidants that fortify dry hair against environmental stress and heat.',
    benefits: [
      'Restores scalp barrier health and reduces itchiness',
      'Shields against UV and pollution damage',
      'Strengthens curl bonds for maximum spring'
    ],
    scientificFact: 'Rich in monounsaturated fats that seal cuticles and prevent moisture loss.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Aisha K.',
    location: 'Dubai, UAE',
    hairType: 'Type 3B Curly',
    rating: 5,
    title: 'Transformed my dry 3B curls completely!',
    comment: 'After living in the Gulf climate for years, my curls were constantly frizzy. The Parachute Hydra Curls Leave-in and Gel combo gave me zero frizz for 3 straight days!',
    verified: true,
    date: '2 days ago'
  },
  {
    id: 2,
    name: 'Fatima H.',
    location: 'Riyadh, KSA',
    hairType: 'Type 4A Coily',
    rating: 5,
    title: 'The Hydrating Mask is pure liquid gold',
    comment: 'Most masks weigh down my coily pattern or leave a greasy film. This mask melts right into my hair and washes clean while leaving insane hydration.',
    verified: true,
    date: '1 week ago'
  },
  {
    id: 3,
    name: 'Layan M.',
    location: 'Amman, Jordan',
    hairType: 'Type 2C Wavy',
    rating: 5,
    title: 'Zero sulfates, 100% bounce!',
    comment: 'Finally a range made specifically for Arab hair textures. My waves look defined, shiny, and bouncy without needing heat tools anymore.',
    verified: true,
    date: '2 weeks ago'
  }
];

export const CLINICAL_STATS = [
  {
    metric: '+240%',
    label: 'Moisture Retention',
    description: 'Clinically tested moisture increase vs. untreated hair after 48 hours.'
  },
  {
    metric: '48 Hours',
    label: 'Frizz Protection',
    description: 'Continuous anti-humidity shield in 85%+ relative humidity conditions.'
  },
  {
    metric: '98%',
    label: 'Less Breakage',
    description: 'Reduction in hair breakage during detangling and daily styling.'
  },
  {
    metric: '100%',
    label: 'Clean Formula',
    description: 'Free from Sulfates, Parabens, Silicones, Phthalates, and Mineral Oil.'
  }
];
