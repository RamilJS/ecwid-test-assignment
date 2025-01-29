<template>
  <div class="product-card" @click="handleClick">
    <img :src="product.imageUrl" :alt="product.name" class="product-image" />

    <div class="cart-item-details">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.defaultDisplayedPriceFormatted }}</p>
    </div>

    <StandardButton
      v-if="showAddToCart"
      :label="isInCart ? 'Add More' : 'Add to Cart'"
      :customClass="'add-to-cart-button'"
      @click="handleAddToCart"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StandardButton from "../standard/StandardButton.vue";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  defaultDisplayedPriceFormatted: string;
}

export default defineComponent({
  name: "ProductCard",
  components: {
    StandardButton,
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    isInCart: {
      type: Boolean,
      required: true,
    },
    showAddToCart: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["productClick", "addToCart"],
  setup(props, { emit }) {
    const handleClick = () => {
      emit("productClick", props.product.id);
    };

    const handleAddToCart = () => {
      emit("addToCart", props.product);
    };

    return {
      handleClick,
      handleAddToCart,
    };
  },
});
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.product-name {
  font-weight: 400;
  margin-bottom: 0;
}

.product-price {
  font-size: 1.2em;
  font-weight: 600;
  color: #333;
}

.add-to-cart-button {
  background-color: #353738;
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: 15px;
  min-width: 100px;
  max-width: 200px;
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
</style>
