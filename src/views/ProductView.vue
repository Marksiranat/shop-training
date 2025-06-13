<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="10">
        <v-card v-if="product" class="pa-4">
          <v-row>
            <!-- รูปภาพด้านซ้าย -->
            <v-col cols="12" md="6">
              <v-img :src="product.image" height="400px" cover class="rounded-lg" />
            </v-col>

            <!-- ข้อมูลสินค้าด้านขวา -->
            <v-col cols="12" md="6">
              <!-- ชื่อสินค้า -->
              <div class="text-h5 font-weight-bold mb-3">{{ product.title }}</div>

              <!-- ราคา -->
              <div class="text-h4 text-blue font-weight-bold mb-4">
                ฿{{ product.price.toLocaleString() }}
              </div>

              <!-- หมวดหมู่ -->
              <v-chip color="indigo" text-color="white" class="mb-4">
                {{ product.category }}
              </v-chip>

              <!-- จำนวนสินค้า -->
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium mb-2">จำนวน</div>
                <div class="d-flex align-center" style="width: fit-content">
                  <v-btn
                    icon="mdi-minus"
                    size="small"
                    variant="outlined"
                    @click="decreaseQuantity"
                    :disabled="quantity <= 1"
                  />
                  <div
                    class="mx-4 text-h6 font-weight-medium"
                    style="min-width: 40px; text-align: center"
                  >
                    {{ quantity }}
                  </div>
                  <v-btn
                    icon="mdi-plus"
                    size="small"
                    variant="outlined"
                    @click="increaseQuantity"
                  />
                </div>
              </div>

              <!-- ปุ่มเพิ่มตะกร้า -->
              <v-btn
                color="indigo-lighten-1"
                size="large"
                class="mb-4"
                style="width: 250px"
                @click="addToCart(product)"
              >
                เพิ่มสินค้าลงตะกร้า
              </v-btn>

              <!-- รายละเอียดสินค้า -->
              <v-card class="pa-4" variant="outlined">
                <div class="text-subtitle-1 font-weight-medium mb-2">
                  รายละเอียดสินค้า
                </div>
                <div class="text-body-2" style="white-space: pre-line">
                  {{ product.description }}
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

        <v-alert v-else type="info">กำลังโหลดข้อมูลสินค้า...</v-alert>

          <v-snackbar v-model="snackbar" timeout="2000" color="green">
          เพิ่ม "{{ product?.title }}" จำนวน {{ quantity }} ชิ้น ลงตะกร้าแล้ว
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import productApi from '@/services/api/features/example'
import { type Product } from '@/models/product' 
import { useCartStore } from '@/plugins/stores/cartStore'

const cart = useCartStore()
const snackbar = ref(false)


const route = useRoute()
const product = ref<Product | null>(null)
const quantity = ref<number>(1)

async function getProductById(id: number) {
  try {
    const response = await productApi.getById<Product>(id)
    product.value = response
  } catch (error) {
    console.error('ไม่สามารถโหลดข้อมูลสินค้า:', error)
  }
}

function increaseQuantity() {
  quantity.value++
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function addToCart(product: Product) {
  console.log('เพิ่มสินค้าลงตะกร้า:', product, 'จำนวน:', quantity.value)
  cart.addToCart(product, quantity.value)
  snackbar.value = true
}

onMounted(() => {
  const id = Number(route.params.id)
  if (!isNaN(id)) {
    getProductById(id)
  }
})
</script>
