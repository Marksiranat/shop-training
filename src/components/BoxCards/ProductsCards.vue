<template>
  <v-row dense>
    <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
      <v-card class="mx-auto" max-width="450" hover @click="goToDetail(product.id)">
        <v-img :src="product.image" height="200px" cover></v-img>

        <v-card-title class="text-h6">{{ product.description }}</v-card-title>

        <v-card-subtitle class="text-subtitle-2 text-black text-h7 ">
          ฿{{ product.price.toLocaleString() }}
        </v-card-subtitle>

        <v-card-text class="d-flex justify-end">
          <v-btn color="indigo-lighten-1" @click="goToDetail(product.id)" class="rounded-pill">
            รายละเอียด
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { type Product } from '@/models/product'

const props = defineProps<{
  products: Product[]
}>()

const router = useRouter()

function goToDetail(id: number) {
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
}
</style>
@/models/product
