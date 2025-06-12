<template>
  <v-container fluid>
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in carousels"
        :key="i"
        :src="item.src"
        cover
      ></v-carousel-item>
    </v-carousel>

    <h2 class="my-4 text-h5">สินค้าแนะนำ</h2>

    <ProductsCards :products="products" />
  </v-container>
</template>

<script setup lang="ts">
import ProductsCards from "@/components/BoxCards/ProductsCards.vue";
import { ref, onMounted } from "vue";
import productApi from "@/services/api/features/example";
import { type Product } from '@/models/product';

const products = ref<Product[]>([]);
const carousels = ref([
  { id: 1, src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" },
  { id: 2, src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
  { id: 3, src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg" },
]);

async function getAllProduct() {
  try {
    const response = await productApi.getAll<Product[]>();
    products.value = response;
  } catch (error) {
    console.error('error', error);
  }
}

onMounted(() => {
  getAllProduct();
});
</script>
