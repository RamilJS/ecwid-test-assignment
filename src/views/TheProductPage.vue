<template>
  <div class="product">
    <HeaderComponent />

    <BreadcrumbsComponent :breadcrumbs="breadcrumbs" />

    <div class="product-container" v-if="loaded">
      <div class="product-image">
        <img :src="activeImageUrl" :alt="product?.name" />

        <div class="thumbnail-container">
          <img
            v-for="(image, index) in galleryImages"
            :key="index"
            :src="image.url"
            @click="setActiveImage(image.url)"
            class="thumbnail"
            :class="{ 'active-thumbnail': image.url === activeImageUrl }"
            alt="Product thumbnail"
          />
        </div>
      </div>

      <div class="product-details">
        <h1 class="product-title">
          {{ product?.name }}
        </h1>
        <div class="product-description" v-html="product?.description"></div>

        <div
          v-if="product?.options && product.options.length > 0"
          class="product-sizes"
        >
          <h3>Available Sizes</h3>
          <div class="sizes-list">
            <span
              v-for="(choice, index) in product?.options[0]?.choices"
              @click="selectSize(choice.text)"
              :key="index"
              :class="{ 'selected-size': selectedSize === choice.text }"
              class="size-option"
            >
              {{ choice.text }}
            </span>
          </div>
        </div>

        <p class="product-price">
          {{ product?.defaultDisplayedPriceFormatted }}
        </p>
        <p class="product-tax">
          {{
            `The tax will be ` +
            product?.tax.defaultLocationIncludedTaxRate +
            `%`
          }}
        </p>

        <StandardButton
          :label="isInCart ? 'Add More' : 'Add to Cart'"
          :customClass="'add-to-cart-button'"
          @click="addToCart"
        />

        <router-link v-if="isInCart" to="/cart" class="go-to-cart-link">
          Go to Cart
        </router-link>

        <ModalOverlay v-if="showModal" @close="closeModal">
          <p>The product has been added to the cart!</p>
        </ModalOverlay>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getProductById } from "../services/ecwidApi.ts";
import { useCartStore } from "../store/index.ts";
import HeaderComponent from "../components/standard/HeaderComponent.vue";
import BreadcrumbsComponent from "../components/standard/BreadcrumbsComponent.vue";
import ModalOverlay from "../components/standard/ModalOverlay.vue";
import { ProductData } from "../types/product-data.ts";
import StandardButton from "../components/standard/StandardButton.vue";

type Product = Omit<ProductData, "selectedSize">;

export default defineComponent({
  name: "TheProductPage",
  components: {
    HeaderComponent,
    BreadcrumbsComponent,
    ModalOverlay,
    StandardButton,
  },
  setup() {
    const cartStore = useCartStore();
    const route = useRoute();

    const product = ref<Product | null>(null);
    const loaded = ref(false);
    const activeImageUrl = ref("");
    const galleryImages = ref<{ url: string }[]>([]);
    const selectedSize = ref("");
    const isInCart = ref(false);
    const showModal = ref(false);

    const breadcrumbs = computed(() => [
      { label: "Home", to: "/" },
      { label: "Product" },
    ]);

    const fetchProduct = async () => {
      const productId = Number(route.params.id);
      try {
        const fetchedProduct = await getProductById(productId);
        product.value = fetchedProduct;
        activeImageUrl.value = fetchedProduct.imageUrl;
        galleryImages.value = [
          { url: fetchedProduct.imageUrl },
          ...fetchedProduct.galleryImages,
        ];
        loaded.value = true;
      } catch (error) {
        console.error("Error loading the product:", error);
      }
    };

    const setActiveImage = (url: string) => {
      activeImageUrl.value = url;
    };

    const selectSize = (size: string) => {
      selectedSize.value = size;
    };

    const addToCart = () => {
      if (product.value) {
        if (product.value.options?.length && !selectedSize.value) {
          alert("Please select the size before adding to the cart");
          return;
        }

        cartStore.addToCart({
          id: product.value.id,
          name: product.value.name,
          price: product.value.price,
          imageUrl: product.value.imageUrl,
          selectedSize: selectedSize.value,
        });

        isInCart.value = true;
        showModal.value = true;

        setTimeout(() => {
          showModal.value = false;
        }, 3000);
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    onMounted(fetchProduct);

    return {
      product,
      loaded,
      activeImageUrl,
      galleryImages,
      selectedSize,
      isInCart,
      showModal,
      breadcrumbs,
      setActiveImage,
      selectSize,
      addToCart,
      closeModal,
    };
  },
});
</script>

<style scoped>
.product {
  margin: 0 auto;
  padding: 20px;
}

.product-container {
  display: flex;
  gap: 20px;
  margin-top: 100px;
}

.product-image {
  flex: 0 0 700px;
  text-align: center;
}

.product-image img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.thumbnail-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
}

.thumbnail:hover,
.active-thumbnail {
  border: 2px solid #000;
}

.product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.product-title {
  font-size: 2em;
  font-weight: 600;
  margin-bottom: 10px;
}

.product-description {
  text-align: left;
  font-size: 1.2em;
  margin-bottom: 20px;
  line-height: 1.6;
  color: #333;
}

.product-price {
  font-size: 1.5em;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.sizes-list {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.size-option {
  padding: 5px 10px;
  border: 1px solid #333;
  cursor: pointer;
  border-radius: 1px;
  transition: background-color 0.2s;
}

.size-option:hover {
  background-color: #0056b3;
  color: white;
}

.selected-size {
  background-color: #0056b3;
  color: white;
}

.product-tax {
  font-size: 1em;
  font-weight: 400;
  color: #333;
  margin-bottom: 20px;
  margin-top: 0;
}

.add-to-cart-button {
  background-color: #353738;
  margin: 0 auto;
  min-width: 200px;
  max-width: 350px;
  color: white;
  border: none;
  font-size: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart-button:hover {
  background-color: #0056b3;
  color: white;
}

.go-to-cart-link {
  display: block;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
}

.go-to-cart-link:hover {
  color: #0056b3;
}

.go-to-cart-link:active {
  color: #062241;
}
</style>
