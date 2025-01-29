<template>
  <div class="home">
    <HeaderComponent />
    <div class="products-categories-list" v-if="loaded">
      <h1>Categories and products list</h1>

      <CategoryList
        :categories="categories"
        :title="'Categories'"
        :activeCategoryId="activeCategoryId"
        @categoryClick="goToCategory"
      />

      <ProductList
        :products="products"
        :cart="cart"
        @productClick="goToProduct"
        @addToCart="addToCart"
      />
    </div>

    <ModalOverlay v-if="showModal" @close="closeModal">
      <p>The product has been added to the cart!</p>
    </ModalOverlay>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import HeaderComponent from "../components/standard/HeaderComponent.vue";
import CategoryList from "../components/category/CategoryList.vue";
import ProductList from "../components/product/ProductList.vue";
import ModalOverlay from "../components/standard/ModalOverlay.vue";
import { getCategories, getProducts } from "../services/ecwidApi.ts";
import { useCartStore } from "../store/index.ts";

export default defineComponent({
  name: "TheMainPage",
  components: {
    HeaderComponent,
    CategoryList,
    ProductList,
    ModalOverlay,
  },
  setup() {
    const categories = ref([]);
    const products = ref([]);
    const loaded = ref(false);
    const cart = ref<Record<number, boolean>>({});
    const showModal = ref(false);
    const activeCategoryId = ref<number | null>(null);

    const cartStore = useCartStore();
    const router = useRouter();

    const fetchData = async () => {
      try {
        categories.value = await getCategories();
        products.value = await getProducts();
        loaded.value = true;
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    const goToCategory = (id: number) => {
      activeCategoryId.value = id;
      router.push(`/category/${id}`);
    };

    const goToProduct = (id: number) => {
      router.push(`/product/${id}`);
    };

    const addToCart = (product: any) => {
      cartStore.addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });

      cart.value[product.id] = true;
      showModal.value = true;

      setTimeout(() => {
        showModal.value = false;
      }, 3000);
    };

    const closeModal = () => {
      showModal.value = false;
    };

    onMounted(fetchData);

    return {
      categories,
      products,
      loaded,
      cart,
      showModal,
      goToCategory,
      goToProduct,
      addToCart,
      closeModal,
      activeCategoryId,
    };
  },
});
</script>

<style scoped>
.home {
  margin: 0 auto;
  padding: 20px;
}
</style>
