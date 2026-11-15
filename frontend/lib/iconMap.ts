// frontend/lib/iconMap.ts
import { type StaticImageData } from 'next/image';

import airplaneImage from '@/components/assets/Airplane Landing.png';
import beautyImage from '@/components/assets/Beautician.png';
import charityImage from '@/components/assets/Charity.png';
import clothesImage from '@/components/assets/Clothes.png';
import glassesImage from '@/components/assets/3D Glasses.png';
import hospitalImage from '@/components/assets/Hospital Room.png';
import houseImage from '@/components/assets/House.png';
import petsImage from '@/components/assets/Pet Commands Summon.png';
import educationImage from '@/components/assets/Online Group Studying.png';
import transportationImage from '@/components/assets/Public Transportation.png';
import restaurantImage from '@/components/assets/Restaurant.png';
import shoppingImage from '@/components/assets/Shopping Bag.png';

export const iconMap: Record<string, StaticImageData> = {
  utensils: restaurantImage,
  car: transportationImage,
  'shopping-bag': shoppingImage,
  'graduation-cap': educationImage,
  shirt: clothesImage,
  heart: charityImage,
  glasses: glassesImage,
  home: houseImage,
  sparkles: beautyImage,
  'paw-print': petsImage,
  plane: airplaneImage,
  bed: hospitalImage,
};