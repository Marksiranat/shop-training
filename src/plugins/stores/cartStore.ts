// /plugins/stores/cartStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Product } from '@/models/product'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<{ product: Product; quantity: number }[]>([])

  function addToCart(product: Product, quantity: number) {
    const existing = cartItems.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      cartItems.value.push({ product, quantity })
    }
  }

  function removeFromCart(productId: number) {
    cartItems.value = cartItems.value.filter(item => item.product.id !== productId)
  } 

    const cartCount = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  )

  return { cartItems, addToCart, removeFromCart , cartCount }
}, {
  persist: true  // ✅ เก็บข้อมูลตะกร้าไว้ใน localStorage ด้วย
})
