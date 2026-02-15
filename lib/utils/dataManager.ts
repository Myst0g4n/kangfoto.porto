// utils/dataManager.ts
// File ini akan mengelola semua data statis yang digunakan aplikasi
// Data akan diembed ke dalam aplikasi saat build time

// Import data langsung di sini untuk memastikan tidak diakses secara langsung
import socialData from '../../private_data/social.json';
import galleriesData from '../../private_data/galleries.json';
import teamsData from '../../private_data/teams.json';
import packagesData from '../../private_data/packages.json';

// Interface untuk data
export interface SocialData {
  facebook: string;
  instagram: string;
  tiktok: string;
  twitter: string;
}

export interface GalleryItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  fullImage: string;
  is_show: boolean;
}

export interface TeamMember {
  id: number;
  name: string;
  experience: string;
  quote: string;
  photo: string;
}

export interface PricePackage {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  note: string;
}

// Fungsi untuk mengakses data
export const getData = {
  social: (): SocialData => socialData,
  galleries: (): GalleryItem[] => galleriesData,
  teams: (): TeamMember[] => teamsData,
  packages: (): PricePackage[] => packagesData,
};

// Fungsi untuk mendapatkan data yang difilter
export const getFilteredData = {
  galleries: {
    active: (): GalleryItem[] => galleriesData.filter(item => item.is_show),
    byCategory: (category: string): GalleryItem[] => 
      galleriesData.filter(item => item.slug.toLowerCase().includes(category.toLowerCase())),
    preview: (count: number = 5): GalleryItem[] => 
      galleriesData.filter(item => item.is_show).slice(0, count),
  },
  
  packages: {
    byId: (id: number): PricePackage | undefined => 
      packagesData.find(pkg => pkg.id === id),
  },
  
  teams: {
    byId: (id: number): TeamMember | undefined => 
      teamsData.find(member => member.id === id),
  },
};