<template>
  <div class="side-navbar-container flex">
    <nav class="side-navbar fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50">
      <div class="flex flex-col h-full py-8 px-6">
        <!-- Project Title -->
        <div class="mb-10">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-800 hover:text-primary">
            WAD PROJECT
          </NuxtLink>
        </div>

        <!-- Navigation Links with Flex-grow -->
        <div class="flex-grow flex flex-col space-y-6">
          <NuxtLink to="/Student/homePage" class="text-gray-600 hover:text-primary">
            Home
          </NuxtLink>
          <NuxtLink to="/Student/bookingPage" class="text-gray-600 hover:text-primary">
            Booking
          </NuxtLink>
          <NuxtLink to="/Student/resourcesPage" class="text-gray-600 hover:text-primary">
            Resources
          </NuxtLink>
          <NuxtLink to="/Student/instructorReview" class="text-gray-600 hover:text-primary">
            Instructor Review
          </NuxtLink>
        </div>

        <!-- Profile link flushed to the bottom -->
        <div class="mt-auto">
          <NuxtLink to="/profile" class="text-gray-600 hover:text-primary">
            Profile
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="content flex-1 ml-64 p-8">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Placeholder script for debugging
console.log('Layout applied');
</script>

<style scoped>
/* Navbar styling */
.side-navbar {
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Content area styling */
.content {
  margin-left: 16rem;
}
</style>
