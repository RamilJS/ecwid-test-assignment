<template>
  <div class="category-container">
    <HeaderComponent />
    <div class="products-categories-list" v-if="loaded">
      <h1>{{ currentCategoryName }} list</h1>

      <BreadcrumbsComponent :breadcrumbs="breadcrumbs" />

      <CategoryList
        :categories="categories"
        :activeCategoryId="activeCategoryId"
        @categoryClick="goToCategory"
      />

      <ProductList
        :products="filteredProducts"
        :cart="cart"
        :showAddToCart="false"
        @productClick="goToProduct"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderComponent from "../components/standard/HeaderComponent.vue";
import BreadcrumbsComponent from "../components/standard/BreadcrumbsComponent.vue";
import CategoryList from "../components/category/CategoryList.vue";
import ProductList from "../components/product/ProductList.vue";
import { getCategories, getProducts } from "../services/ecwidApi.ts";
import { ProductData } from "../types/product-data.ts";

type TProduct = Pick<
  ProductData,
  "id" | "name" | "price" | "imageUrl" | "defaultDisplayedPriceFormatted"
>;

type Product = TProduct & {
  categoryIds: number[];
};

type Category = {
  id: number;
  name: string;
  image: string;
};

export default defineComponent({
  name: "TheCategoryPage",
  components: {
    HeaderComponent,
    BreadcrumbsComponent,
    CategoryList,
    ProductList,
  },
  setup() {
    const categories = ref<Category[]>([]);
    const products = ref<Product[]>([]);
    const loaded = ref(false);
    const activeCategoryId = ref<number | null>(null);
    const cart = ref<Record<number, boolean>>({});
    const route = useRoute();
    const router = useRouter();

    const filteredProducts = computed(() => {
      if (activeCategoryId.value === null) {
        return [];
      }
      return products.value.filter((product) =>
        product.categoryIds.includes(activeCategoryId.value!)
      );
    });

    const currentCategoryName = computed(() => {
      const activeCategory = categories.value.find(
        (category) => category.id === activeCategoryId.value
      );
      return activeCategory ? activeCategory.name : "Unknown category";
    });

    const breadcrumbs = computed(() => [
      { label: "Home", to: "/" },
      { label: currentCategoryName.value },
    ]);

    const goToCategory = (id: number) => {
      activeCategoryId.value = id;
      router.push(`/category/${id}`);
    };

    const goToProduct = (id: number) => {
      router.push(`/product/${id}`);
    };

    const addToCart = (product: Product) => {
      cart.value[product.id] = true;
    };

    onMounted(async () => {
      try {
        categories.value = await getCategories();
        products.value = await getProducts();
        loaded.value = true;

        const categoryIdFromRoute = Number(route.params.id);
        if (categoryIdFromRoute) {
          activeCategoryId.value = categoryIdFromRoute;
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    });

    return {
      categories,
      products,
      loaded,
      activeCategoryId,
      filteredProducts,
      currentCategoryName,
      breadcrumbs,
      cart,
      goToCategory,
      goToProduct,
      addToCart,
    };
  },
});
</script>

<style scoped>
.category-container {
  margin: 0 auto;
  padding: 20px;
}

:deep(.product-list) {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

:deep(.product-card) {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  border: none;
}

:deep(.product-card:hover) {
  background-color: #ddd;
}

:deep(.product-image) {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
  margin-left: 20px;
}

:deep(.product-name) {
  margin-right: 20px;
}

:deep(.cart-item-details) {
  display: flex;
  width: 100%;
}
</style>
