<template>
  <div class="cart-item">
    <img :src="item.imageUrl" alt="Product Image" class="cart-item-image" />

    <div class="cart-item-details">
      <h2 class="cart-item-name">{{ item.name }}</h2>
      <p class="cart-item-price">
        € {{ (item.price * item.quantity).toFixed(2) }}
      </p>
      <p class="cart-item-size" v-if="item.selectedSize">
        Size: {{ item.selectedSize }}
      </p>

      <div class="cart-quantity">
        <button @click="onDecrease" class="quantity-button">-</button>
        <p class="cart-item-quantity">Quantity: {{ item.quantity }}</p>
        <button @click="onIncrease" class="quantity-button">+</button>
      </div>

      <StandardButton
        label="Delete"
        :customClass="'delete-button'"
        @click="onRemove"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StandardButton from "../standard/StandardButton.vue";

interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  selectedSize?: string;
  quantity: number;
}

export default defineComponent({
  name: "CartItem",
  components: { StandardButton },
  props: {
    item: {
      type: Object as PropType<CartItem>,
      required: true,
    },
  },
  emits: ["increaseQuantity", "decreaseQuantity", "remove"],
  setup(props, { emit }) {
    const onIncrease = () => emit("increaseQuantity", props.item);
    const onDecrease = () => emit("decreaseQuantity", props.item.id);
    const onRemove = () => emit("remove", props.item.id);

    return {
      onIncrease,
      onDecrease,
      onRemove,
    };
  },
});
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
}

.cart-item-details {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
}

.cart-item-name {
  font-size: 18px;
  margin: 0;
}

.cart-item-price {
  font-size: 16px;
  color: #555;
}

.cart-quantity {
  display: flex;
}

.cart-item-quantity {
  margin-left: 5px;
  margin-right: 5px;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.delete-button:hover {
  background-color: #ff1a1a;
}
</style>
