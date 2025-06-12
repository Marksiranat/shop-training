<template>
  <v-container fluid class="pa-4">
    <!-- Title -->
    <h2 class="mb-6 font-weight-bold text-center">ตะกร้าสินค้า</h2>

    <!-- Table -->
    <v-table class="elevation-1" dense>
      <thead>
        <tr>
          <th>#</th>
          <th>รูปภาพ</th>
          <th>รหัสสินค้า</th>
          <th>ชื่อสินค้า</th>
          <th>หมวดหมู่</th>
          <th class="text-end">ราคาต่อหน่วย</th>
          <th class="text-center">จำนวน</th>
          <th class="text-end">ราคารวม</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index" class="hover:bg-gray-100">
          <td>{{ index + 1 }}</td>
          <td>
            <v-img :src="item.image" width="50" height="50" cover />
          </td>
          <td>{{ item.code }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td class="text-end">{{ item.price.toFixed(2) }}</td>
          <td class="text-center">
            1
          </td>
          <td class="text-end">{{ (item.price * item.quantity).toFixed(2) }}</td>
        </tr>
      </tbody>
    </v-table>

    <!-- Price Summary -->
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
          <!-- <v-btn color="success" class="mt-4" block>ดำเนินการชำระเงิน</v-btn> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

const items = reactive([
  {
    image: 'https://i.pinimg.com/736x/ce/af/21/ceaf21c671cc9b4ed6c9c68adcac1d2b.jpg',
    code: 'PROD0001',
    name: 'สินค้า 1',
    category: 'หมวด A',
    price: 100,
    quantity: 1,
  },
  {
    image: 'https://i.pinimg.com/736x/ce/af/21/ceaf21c671cc9b4ed6c9c68adcac1d2b.jpg',
    code: 'PROD0002',
    name: 'สินค้า 2',
    category: 'หมวด B',
    price: 200,
    quantity: 1,
  },
  // เพิ่มสินค้าได้ตามต้องการ
])

const shipping = 837

const totalAmount = computed(() =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
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
