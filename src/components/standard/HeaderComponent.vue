<template>
  <header class="header">
    <nav class="nav">
      <ul>
        <li class="header-list-item">
          <router-link to="/" class="header-item-link"> Home </router-link>
        </li>

        <li
          class="header-list-item dropdown"
          @mouseenter="showDropdown"
          @mouseleave="hideDropdown"
        >
          <router-link to="#" class="header-item-link">Categories</router-link>
          <ul v-if="isDropdownVisible" class="dropdown-menu">
            <li v-for="category in categories" :key="category.id">
              <router-link
                :to="`/category/${category.id}`"
                class="header-item-link"
              >
                {{ category.name }}
              </router-link>
            </li>
          </ul>
        </li>

        <li class="header-list-item">
          <router-link to="/cart" class="header-item-link">Cart</router-link>
        </li>
      </ul>
    </nav>
    <div class="cart">
      <router-link to="/cart">
        <span class="cart-icon">🛒</span>
        <span class="cart-count">{{ cartItemCount }}</span>
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useCartStore } from "../../store";
import { getCategories } from "../../services/ecwidApi";

interface Category {
  id: number;
  name: string;
}

export default defineComponent({
  name: "HeaderComponent",
  setup() {
    const cartStore = useCartStore();
    cartStore.loadCartFromLocalStorage();

    const isDropdownVisible = ref(false);
    const categories = ref<Category[]>([]);

    const cartItemCount = computed(() => {
      return cartStore.cartItems.reduce(
        (total: number, item: { quantity: number }) => total + item.quantity,
        0
      );
    });

    const showDropdown = () => {
      isDropdownVisible.value = true;
    };
    const hideDropdown = () => {
      isDropdownVisible.value = false;
    };

    onMounted(async () => {
      try {
        categories.value = await getCategories();
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    });

    return {
      cartItemCount,
      isDropdownVisible,
      categories,
      showDropdown,
      hideDropdown,
    };
  },
});
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav {
  padding: 30px;
}
.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav li {
  margin: 0 15px;
  position: relative;
}

.router-link-active {
  color: inherit;
}

.router-link-exact-active {
  color: inherit;
}

.header-item-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: color 0.3s;
}

.header-item-link:hover {
  color: #0056b3;
  text-decoration: none;
}

.cart {
  position: relative;
}

.cart-icon {
  font-size: 24px;
}

.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 14px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.dropdown-menu li {
  margin: 10px;
}

.dropdown-menu li a {
  text-decoration: none;
  color: black;
}

.dropdown::after {
  content: "";
  display: inline-block;
  margin-left: 5px;
  vertical-align: middle;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
  transition: transform 0.3s ease;
}

.dropdown:hover::after {
  transform: rotate(180deg);
}
</style>
