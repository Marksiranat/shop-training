<template>
  <v-container fluid class="pa-4">
    <h2 class="mb-6 font-weight-bold text-center">ตะกร้าสินค้า</h2>

    <!-- ✅ ใช้ Card UI จาก component -->
    <ProductCardList :products="cart.cartItems" mode="cart" />

    <!-- ✅ สรุปราคา -->
    <v-row class="mt-10">
      <v-col cols="12">
        <v-card class="pa-4 elevation-2">
          <h4 class="font-weight-bold text-center">สรุปราคา</h4>
          <v-row class="mt-4">
            <v-col cols="6" class="text-start">
              <strong>ค่าสินค้า :</strong>
            </v-col>
            <v-col cols="6" class="text-end">
              {{ totalAmount.toFixed(2) }} บาท
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="text-start">
              <strong>ค่าจัดส่ง :</strong>
            </v-col>
            <v-col cols="6" class="text-end">
              {{ shipping.toFixed(2) }} บาท
            </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col cols="6" class="text-start text-h5 font-weight-bold text-primary">
              <strong>ยอดรวม :</strong>
            </v-col>
            <v-col cols="6" class="text-end text-h5 font-weight-bold text-primary">
              {{ (totalAmount + shipping).toFixed(2) }} บาท
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/plugins/stores/cartStore'
import ProductCardList from '@/components/BoxCards/ProductsCards.vue'

const cart = useCartStore()

const shipping = 100

const totalAmount = computed(() =>
  cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
)
</script>
