<template>
  <div class="side-navbar-container flex">
    <!-- Hamburger menu button for mobile view using ShadCN Button -->
    <Button
      variant="ghost"
      size="lg"
      class="md:hidden p-4 fixed top-2.5 left-0 z-50 bg-white rounded-full shadow-lg"
      @click="toggleMenu"
    >
      <!-- SVG Icon for Hamburger -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 text-dark"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </Button>

    <!-- Sidebar Navigation using ShadCN Button component for nav links -->
    <nav
      :class="menuOpen ? 'translate-x-0' : '-translate-x-full'"
      class="side-navbar fixed top-0 left-0 h-full w-60 z-40 md:translate-x-0 transition-transform duration-300 ease-in-out border border-solid text-white bg-black"
    >
      <div class="flex flex-col h-full py-8 px-6">
        <!-- Project Title -->
        <div class="mb-10 flex justify-center">
          <NuxtLink to="/" class="text-3xl font-bold tracking-tight">
            Learn2Drive
          </NuxtLink>
        </div>

        <div class="flex-grow flex flex-col space-y-4">
          <NuxtLink to="/Instructor/HomePage" class="nav-link">
            <Button variant="ghost" class="w-full justify-start"
              >🏠 Home
            </Button>
          </NuxtLink>
          <NuxtLink to="/Instructor/Availability" class="nav-link w-full">
            <Button variant="ghost" class="w-full justify-start"
              >📅 Availability
            </Button>
          </NuxtLink>
          <NuxtLink to="/Instructor/StudentAnalysis" class="nav-link w-full">
            <Button variant="ghost" class="w-full justify-start">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 mr-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
              Student Analysis
            </Button>
          </NuxtLink>
          <NuxtLink to="/Instructor/addEvents" class="nav-link w-full">
            <Button variant="ghost" class="w-full justify-start"
              >add
            </Button>
          </NuxtLink>
        </div>

        <!-- Profile link flushed to the bottom -->
        <div class="flex justify-center mt-auto">
          <Button variant="ghost">
            <NuxtLink to="/Instructor/Profile" class="nav-link">
              👤 Profile
            </NuxtLink>
          </Button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div
      class="content flex-1 p-8 transition-all duration-300 ease-in-out"
      :class="menuOpen ? 'ml-64' : 'ml-0 md:ml-64'"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Assuming you have a classnames utility function in your project

const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style></style>
