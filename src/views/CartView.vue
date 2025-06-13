<template>
  <v-container fluid class="pa-4">
    <h2 class="mb-6 font-weight-bold text-center">ตะกร้าสินค้า</h2>

    <!-- ✅ แสดงสินค้าแบบ Card -->
    <ProductCardList :products="items" />

    <!-- ✅ ตารางเดิม -->
    <v-table class="elevation-1" dense>
      <!-- ... -->
    </v-table>

    <!-- ✅ สรุปราคา -->
    <!-- ... -->
  </v-container>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/plugins/stores/cartStore'

const cart = useCartStore()

const shipping = 837

const totalAmount = computed(() =>
  cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
)
</script>


<style scoped>
.v-table {
  overflow-x: auto;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc; /* สีพื้นหลังเมื่อชี้เมาส์ */
}
</style>
