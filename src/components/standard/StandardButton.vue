<template>
  <button class="standard-button" :class="customClass" @click="handleClick">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StandardButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    customClass: {
      type: String,
      default: "",
    },
  },
  emits: ["click"],
  methods: {
    handleClick(event: Event) {
      event.stopPropagation();
      this.$emit("click");
    },
  },
});
</script>

<style scoped>
.standard-button {
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease;
}
</style>
