<template>
  <div class="empty-cart">
    <p>Your cart is empty</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmptyCart",
});
</script>

<style scoped>
.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #777;
}
</style>
