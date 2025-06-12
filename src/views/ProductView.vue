<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card v-if="product">
          <v-img
            :src="product.image"
            height="300px"
            cover
          ></v-img>

          <v-card-title class="text-h5">
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle class="text-subtitle-1">
            ราคา: ฿{{ product.price.toLocaleString() }}
          </v-card-subtitle>

          <v-card-text>
            {{ product.description }}
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="addToCart(product)">
              เพิ่มสินค้าลงตะกร้า
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-alert v-else type="info">
          กำลังโหลดข้อมูลสินค้า...
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import productApi from '@/services/api/features/example'
import { type Product } from '@/models/product'

const route = useRoute()
const product = ref<Product | null>(null)

async function getProductById(id: number) {
  try {
    const response = await productApi.getById<Product>(id)
    product.value = response
  } catch (error) {
    console.error('ไม่สามารถโหลดข้อมูลสินค้า:', error)
  }
}

function addToCart(product: Product) {
  console.log('เพิ่มสินค้าลงตะกร้า:', product)
  // ที่นี่คุณสามารถเพิ่ม logic Vuex หรือ LocalStorage ได้
}

onMounted(() => {
  const id = Number(route.params.id)
  if (!isNaN(id)) {
    getProductById(id)
  }
})
</script>
