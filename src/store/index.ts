import { defineStore } from "pinia";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  selectedSize?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface State {
  cart: CartItem[];
}

export const useCartStore = defineStore("cart", {
  state: (): State => ({
    cart: [],
  }),

  actions: {
    loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    },

    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    addToCart(product: Product & { selectedSize?: string }) {
      const existingItem = this.cart.find(
        (item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }

      this.saveCartToLocalStorage();
    },

    removeFromCart(productId: number) {
      const itemIndex = this.cart.findIndex((item) => item.id === productId);

      if (itemIndex !== -1) {
        const item = this.cart[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          this.cart.splice(itemIndex, 1);
        }

        this.saveCartToLocalStorage();
      }
    },

    clearCart() {
      this.cart = [];

      this.saveCartToLocalStorage();
    },
  },

  getters: {
    cartCount(): number {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },

    cartItems(): CartItem[] {
      return this.cart;
    },

    totalPrice(): number {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});
