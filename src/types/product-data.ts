export type ProductData = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  galleryImages: { url: string }[];
  description: string;
  defaultDisplayedPriceFormatted: string;
  options: {
    type: string;
    name: string;
    choices: { text: string }[];
  }[];
  tax: { defaultLocationIncludedTaxRate: number };
  selectedSize?: string;
};
