// stores/useAuth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', () => {
  const userId = ref(null)

  const setUserId = (id) => {
    userId.value = id
  }

  const clearUserId = () => {
    userId.value = null
  }

  const isAuthenticated = computed(() => userId.value !== null)

  return {
    userId,
    setUserId,
    clearUserId,
    isAuthenticated
  }
}, {
persist: {
  enabled: true,
  strategies: [
    {
      storage: localStorage,
      paths: ['userid'], // Only persist the userid
    },
  ],
}})