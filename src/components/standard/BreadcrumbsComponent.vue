<template>
  <div class="breadcrumbs-container">
    <ul class="breadcrumbs-list">
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumbs-item"
      >
        <router-link
          v-if="breadcrumb.to"
          :to="breadcrumb.to"
          class="breadcrumb-link"
        >
          {{ breadcrumb.label }}
        </router-link>
        <span v-else class="breadcrumb-link">{{ breadcrumb.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Breadcrumb {
  label: string;
  to?: string;
}

export default defineComponent({
  name: "BreadcrumbsComponent",
  props: {
    breadcrumbs: {
      type: Array as PropType<Breadcrumb[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.breadcrumbs-container {
  margin-top: 30px;
  margin-bottom: 30px;
}

.breadcrumbs-list {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs-item {
  font-size: 1.2em;
  color: #666;
}

.breadcrumbs-item:first-child {
  margin: 0 10px;
}

.breadcrumbs-item::after {
  content: "/";
  margin-left: 5px;
  color: #6c757d;
}

.breadcrumbs-item:last-child::after {
  content: "";
}

.breadcrumb-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.breadcrumb-link:hover {
  color: #0056b3;
}

.breadcrumbs-item:last-child .breadcrumb-link:hover {
  color: #007bff;
}

.breadcrumb-separator {
  margin: 0 10px;
  color: #888;
}
</style>
