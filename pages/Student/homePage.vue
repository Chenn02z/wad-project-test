<template>
  <div class="flex h-screen">
    
    <!-- Content Area -->
    <div class="flex-1 bg-gray-100 p-12">
      <h1 class="text-4xl font-bold text-gray-800 text-center mb-10">Your Driving Lesson Schedule</h1>

      <!-- Carousel Component -->
      <div class="relative">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div v-for="(lesson, index) in lessons" :key="index" class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transform transition duration-300">
            <h2 class="text-2xl font-semibold text-gray-900">Instructor: {{ lesson.instructor }}</h2>
            <p class="text-gray-600 mt-2">Date: {{ lesson.date }}</p>
            <p class="text-gray-600">Time: {{ lesson.time }}</p>
            <p class="text-gray-600">Duration: {{ lesson.duration }}</p>
            <p class="text-gray-600">Location: {{ lesson.location }}</p>
          </div>
        </div>

        <!-- Carousel Navigation -->
        <div class="absolute inset-y-0 left-0 flex items-center">
          <button class="bg-white p-3 rounded-full shadow text-gray-700 hover:bg-gray-200">
            <span class="sr-only">Previous</span>
            ←
          </button>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center">
          <button class="bg-white p-3 rounded-full shadow text-gray-700 hover:bg-gray-200">
            <span class="sr-only">Next</span>
            →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const lessons = [
  { instructor: "Lee Yi Kang", date: "Oct 10, 2024", time: "10:00 AM", duration: "1 hour", location: "Ang Mo Kio" },
  { instructor: "Lee Yi Kang", date: "Oct 12, 2024", time: "2:00 PM", duration: "1 hour", location: "Ang Mo Kio" },
  { instructor: "Lee Yi Kang", date: "Oct 15, 2024", time: "11:00 AM", duration: "1 hour", location: "Ang Mo Kio" },
  { instructor: "Lee Yi Kang", date: "Oct 17, 2024", time: "1:00 PM", duration: "1 hour", location: "Ang Mo Kio" },
];
</script>

<style scoped>
/* Sidebar Styles */
aside {
  height: 100vh;
}

/* Card Styles */
.bg-white {
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.hover\\:shadow-md {
  transition: box-shadow 0.3s ease-in-out;
}

.hover\\:shadow-md:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Button Styles */
button {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e5e7eb;
}
</style>
