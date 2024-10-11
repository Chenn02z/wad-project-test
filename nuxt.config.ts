import Icons from 'unplugin-icons/vite'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  vite: {
    plugins: [
      Icons({
        autoInstall: true,  // Automatically installs missing icons
        compiler: 'vue3'    // Ensure Vue 3 compatibility
      })
    ]
  },

  compatibilityDate: '2024-10-10'
})