<template>
  <div class="products">
    <h2>Products</h2>
    <div class="product-list">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :isInCart="!!cart[product.id]"
        :showAddToCart="showAddToCart"
        @productClick="onProductClick"
        @addToCart="onAddToCart"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProductCard from "./ProductCard.vue";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  defaultDisplayedPriceFormatted: string;
}

export default defineComponent({
  name: "ProductList",
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
    cart: {
      type: Object as PropType<Record<number, boolean>>,
      required: true,
    },
    showAddToCart: {
      type: Boolean,
      default: true, // По умолчанию кнопка показывается
    },
  },
  emits: ["productClick", "addToCart"],
  setup(_, { emit }) {
    const onProductClick = (id: number) => {
      emit("productClick", id);
    };

    const onAddToCart = (product: Product) => {
      emit("addToCart", product);
    };

    return {
      onProductClick,
      onAddToCart,
    };
  },
});
</script>

<style scoped>
.products {
  margin-bottom: 40px;
}

.product-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
</style>
