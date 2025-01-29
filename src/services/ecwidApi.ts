import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const getCategories = async () => {
  try {
    const response = await api.get("/categories", {
      params: { responseFields: "items(id,name)" },
    });

    return response.data.items;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get("/products", {
      params: {
        responseFields:
          "items(id,name,price,imageUrl,defaultDisplayedPriceFormatted, categoryIds)",
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error in receiving goods:", error);
    throw error;
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await api.get(`/products/${id}`, {
      params: {
        responseFields:
          "id, name, price, url, imageUrl, originalImageUrl, hdThumbnailUrl, thumbnailUrl, description, defaultDisplayedPriceFormatted, options, tax, categoryIds, galleryImages(url, imageUrl,originalImageUrl,hdThumbnailUrl,thumbnailUrl)",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Product receipt error:", error);
    throw error;
  }
};
