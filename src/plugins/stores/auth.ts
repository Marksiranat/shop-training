import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user_token = ref('') // token

  function setup (token: string) {
    user_token.value = token
  }

  function clear () {
    user_token.value = ''
  }

  const isLoggedIn = computed(() => !!user_token.value)

  return { user_token, setup, clear, isLoggedIn } 
}, {
  persist: {
    key: 'user_access_token',
    storage: localStorage,
    pick: ['user_token']
  }
})

