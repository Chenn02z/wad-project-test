import Icons from 'unplugin-icons/vite';

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/supabase','@pinia/nuxt'],

  // Runtime Configurations for Environment Variables
  runtimeConfig: {

    googleProjectId: process.env.GOOGLE_PROJECT_ID,
    googlePrivateKeyId: process.env.GOOGLE_PRIVATE_KEY_ID,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientX509CertUrl: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_KEY || '',
    },
  },

  // Supabase Module Configuration
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      include: undefined,
      exclude: ['/*'],
      cookieRedirect: false,
    },

    // redirectOptions: {
    //   login: '/',
    //   callback: '/Instructor/homePage',
    //   include: undefined,
    //   exclude: [],
    //   cookieRedirect: false,
    // }
  },

  // shadcn-nuxt Module Configuration
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  // Vite Configuration for Icons Plugin
  vite: {
    plugins: [
      Icons({
        autoInstall: true, // Automatically installs missing icons
        compiler: 'vue3', // Ensure Vue 3 compatibility
      }),
    ],
  },

  // Compatibility Settings
  compatibilityDate: '2024-10-10',
});
