<template>
  <div class="categories">
    <h2>{{ title }}</h2>
    <div class="category-grid">
      <div
        class="category-card"
        v-for="category in categories"
        :key="category.id"
        @click="onCategoryClick(category.id)"
        :class="{ active: isActiveCategory(category.id) }"
      >
        <h3>{{ category.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Category {
  id: number;
  name: string;
}

export default defineComponent({
  name: "CategoryList",
  props: {
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
    title: {
      type: String,
      default: "Categories", // default title
    },
    columns: {
      type: Number,
      default: 2, // default columns
    },
    activeCategoryId: {
      type: [Number, null] as PropType<number | null>,
      required: true,
    },
  },
  emits: ["categoryClick"],
  setup(props, { emit }) {
    const onCategoryClick = (id: number) => {
      emit("categoryClick", id);
    };

    const isActiveCategory = (id: number) => {
      return id === props.activeCategoryId;
    };

    return {
      onCategoryClick,
      isActiveCategory,
    };
  },
});
</script>

<style scoped>
.categories {
  margin-bottom: 40px;
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.category-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.category-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.category-card.active {
  background-color: #f0f0f0;
}
</style>
