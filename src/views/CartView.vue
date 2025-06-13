<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/plugins/stores/cartStore'
import ProductCardList from '@/components/BoxCards/ProductsCards.vue'

const cart = useCartStore()

const shipping = 100

// ✅ แปลง cartItems เพื่อส่งให้ ProductCardList ใช้ใน mode 'cart'
const cartList = computed(() =>
  cart.cartItems.map(item => ({
    ...item.product,
    quantity: item.quantity,
  }))
)

// ✅ รวมราคาสินค้าทั้งหมด
const totalAmount = computed(() =>
  cart.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
)
</script>

<template>
  <v-container fluid class="pa-4">
    <h2 class="mb-6 font-weight-bold text-start">ตะกร้าสินค้า</h2>

    <!-- ✅ แสดงสินค้าในตะกร้า -->
    <ProductCardList :products="cartList" mode="cart" />

    <!-- ✅ สรุปราคา -->
    <v-row justify="end" class="mt-6">
      <v-col cols="12" md="4">
        <v-card class="pa-4" variant="outlined">
          <div class="d-flex justify-space-between mb-2">
            <span>ยอดรวมสินค้า</span>
            <strong>฿{{ totalAmount.toLocaleString() }}</strong>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span>ค่าจัดส่ง</span>
            <strong>฿{{ shipping }}</strong>
          </div>
          <div class="d-flex justify-space-between mt-4 text-h6 font-weight-bold">
            <span>รวมทั้งสิ้น</span>
            <span>฿{{ (totalAmount + shipping).toLocaleString() }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
