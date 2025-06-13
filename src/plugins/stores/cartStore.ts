import {defineStore} from 'pinia'
import {ref} from 'vue'
import type { Product } from '@/models/product'

export const useCartStore = defineStore('cart', ()=> {
    const cartItems = ref<(Product & {quantity: number})[]>([])

    function addToCart(product: Product){
        const existingItem = cartItems.value.find((item)=> item.id === product.id)
        if(existingItem){
            existingItem.quantity++
        } else {
            cartItems.value.push({...product , quantity:1})
        }
    }


    function removeFromCart(id: number){
        cartItems.value = cartItems.value.filter(item => item.id !== id)
    }

     return {
    cartItems,
    addToCart,
    removeFromCart,
  }
})