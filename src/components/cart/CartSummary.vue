<template>
  <div class="cart-summary">
    <p class="total-price">Total: € {{ totalPrice.toFixed(2) }}</p>

    <StandardButton
      label="Place Order"
      :customClass="'place-order-button'"
      @click="onPlaceOrder"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StandardButton from "../standard/StandardButton.vue";

export default defineComponent({
  name: "CartSummary",
  components: { StandardButton },
  props: {
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  emits: ["placeOrder"],
  setup(_, { emit }) {
    const onPlaceOrder = () => emit("placeOrder");
    return { onPlaceOrder };
  },
});
</script>

<style scoped>
.cart-summary {
  margin-top: 20px;
  text-align: right;
}

.total-price {
  font-size: 20px;
  font-weight: bold;
}

.place-order-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 15px 30px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.place-order-button:hover {
  background-color: #218838;
}
</style>
