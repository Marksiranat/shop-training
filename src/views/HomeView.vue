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

    <h2 class="my-4 text-h3 text-ml-h5">สินค้าแนะนำ</h2>

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
  { id: 1, src: "https://media.about.nike.com/img/f4669187-5df0-4a83-a1ca-8958f02440bb/nike-air-is-the-athletes-advantag.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjIxNywid2lkdGgiOjEyNzksImhlaWdodCI6ODU0fSwicmVzaXplIjp7IndpZHRoIjozODQwfX19&s=a27f87ee53a86e0248ad3d602e9e2058c4d091adcfb920bfa1fb453bfedd1b2a" },
  { id: 2, src: "https://media.gq-magazine.co.uk/photos/66449a64667d1a784d990b45/master/pass/Adidas-Samba-b.jpg" },
  { id: 3, src: "https://media.gq-magazine.co.uk/photos/65706fb67fdc3c767a9a571f/16:9/w_2240,c_limit/Sneaker_NEW.jpg" },
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
