import React from "react";
import {
  Utensils,
  Car,
  ShoppingBag,
  GraduationCap,
  Shirt,
  HeartHandshake,
  Film,
  Home,
  Sparkles,
  Wallet,
  Briefcase,
  Gift,
  Smartphone,
  Zap,
  Plane,
  Coffee,
  Stethoscope,
  PiggyBank,
  CreditCard,
  Dumbbell,
  LucideIcon,
} from "lucide-react";

export interface CategoryIconItem {
  name: string;
  label: string;
  icon: LucideIcon;
}

export const ICON_LIBRARY: CategoryIconItem[] = [
  { name: "utensils", label: "Makanan / Restoran", icon: Utensils },
  { name: "coffee", label: "Kopi / Nongkrong", icon: Coffee },
  { name: "car", label: "Transportasi", icon: Car },
  { name: "plane", label: "Travel / Liburan", icon: Plane },
  { name: "shopping-bag", label: "Belanja", icon: ShoppingBag },
  { name: "shirt", label: "Pakaian / Fashion", icon: Shirt },
  { name: "home", label: "Kebutuhan Rumah", icon: Home },
  { name: "zap", label: "Listrik & Tagihan", icon: Zap },
  { name: "smartphone", label: "Pulsa & Internet", icon: Smartphone },
  { name: "graduation-cap", label: "Pendidikan", icon: GraduationCap },
  { name: "stethoscope", label: "Kesehatan", icon: Stethoscope },
  { name: "dumbbell", label: "Olahraga / Gym", icon: Dumbbell },
  { name: "sparkles", label: "Kecantikan", icon: Sparkles },
  { name: "film", label: "Hiburan", icon: Film },
  { name: "heart-handshake", label: "Sosial / Donasi", icon: HeartHandshake },
  { name: "wallet", label: "Gaji / Dompet", icon: Wallet },
  { name: "briefcase", label: "Bisnis / Kerja", icon: Briefcase },
  { name: "piggy-bank", label: "Tabungan", icon: PiggyBank },
  { name: "credit-card", label: "Cicilan / Kartu", icon: CreditCard },
  { name: "gift", label: "Hadiah / Bonus", icon: Gift },
];

export function CategoryIcon({
  name,
  className = "w-5 h-5",
}: {
  name: string;
  className?: string;
}) {
  const found = ICON_LIBRARY.find((item) => item.name === name);
  const IconComponent = found ? found.icon : Wallet;
  return <IconComponent className={className} />;
}