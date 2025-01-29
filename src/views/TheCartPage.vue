<template>
  <div class="cart-container">
    <HeaderComponent />

    <h1>Cart</h1>

    <BreadcrumbsComponent :breadcrumbs="breadcrumbs" />

    <EmptyCart v-if="cartItems.length === 0" />

    <div v-else>
      <CartItem
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
        @increaseQuantity="increaseQuantity"
        @decreaseQuantity="decreaseQuantity"
        @remove="removeFromCart"
      />

      <CartSummary :totalPrice="totalPrice" @placeOrder="placeOrder" />
    </div>

    <ModalOverlay v-if="showModal" @close="closeModal">
      <p>Thank you for your order!</p>
    </ModalOverlay>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useCartStore } from "../store/index.ts";
import HeaderComponent from "../components/standard/HeaderComponent.vue";
import BreadcrumbsComponent from "../components/standard/BreadcrumbsComponent.vue";
import ModalOverlay from "../components/standard/ModalOverlay.vue";
import CartItem from "../components/cart/CartItem.vue";
import CartSummary from "../components/cart/CartSummary.vue";
import EmptyCart from "../components/cart/EmptyCart.vue";
import { ProductData } from "../types/product-data.ts";

type Product = Pick<
  ProductData,
  "id" | "name" | "price" | "imageUrl" | "selectedSize"
>;

type CartItem = Product & {
  quantity: number;
};

export default defineComponent({
  name: "TheCartPage",
  components: {
    HeaderComponent,
    BreadcrumbsComponent,
    ModalOverlay,
    EmptyCart,
    CartItem,
    CartSummary,
  },
  setup() {
    const cartStore = useCartStore();
    cartStore.loadCartFromLocalStorage();

    const showModal = ref(false);

    const breadcrumbs = [{ label: "Home", to: "/" }, { label: "Cart" }];

    const cartItems = computed(() => cartStore.cartItems);
    const totalPrice = computed(() => cartStore.totalPrice);

    const increaseQuantity = (item: CartItem) => {
      cartStore.addToCart(item);
    };

    const decreaseQuantity = (productId: number) => {
      cartStore.removeFromCart(productId);
    };

    const removeFromCart = (productId: number) => {
      cartStore.removeFromCart(productId);
    };

    const placeOrder = () => {
      cartStore.clearCart();
      showModal.value = true;

      setTimeout(() => {
        showModal.value = false;
      }, 3000);
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      cartItems,
      totalPrice,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      placeOrder,
      closeModal,
      showModal,
      breadcrumbs,
    };
  },
});
</script>

<style scoped>
.cart-container {
  margin: 0 auto;
  padding: 20px;
}
</style>
