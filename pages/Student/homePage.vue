<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-indigo-800 text-center mb-10">Your Driving Journey</h1>
      
      <div class="relative">
        <TransitionGroup 
          name="lesson-list" 
          tag="div" 
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div 
            v-for="lesson in visibleLessons" 
            :key="lesson.id" 
            class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <div class="bg-indigo-600 text-white p-4">
              <h2 class="text-xl font-semibold">{{ formatDate(lesson.date) }}</h2>
            </div>
            <div class="p-6">
              <p class="text-gray-600 mb-2"><span class="font-semibold">Time:</span> {{ lesson.time }}</p>
              <p class="text-gray-600 mb-2"><span class="font-semibold">Duration:</span> {{ lesson.duration }}</p>
              <p class="text-gray-600 mb-2"><span class="font-semibold">Location:</span> {{ lesson.location }}</p>
              <p class="text-gray-600 mb-2"><span class="font-semibold">Instructor:</span> {{ lesson.instructor }}</p>
            </div>
          </div>
        </TransitionGroup>
        
        <div class="flex justify-between mt-6">
          <button 
            @click="prevPage" 
            class="bg-indigo-600 text-white px-4 py-2 rounded-full shadow transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            :disabled="currentPage === 1"
          >
            Previous
          </button>
          <button 
            @click="nextPage" 
            class="bg-indigo-600 text-white px-4 py-2 rounded-full shadow transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            :disabled="currentPage === totalPages"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'studentview'
});
import { ref, computed } from 'vue'

const lessons = ref([
  { id: 1, instructor: "Lee Yi Kang", date: "2024-10-10", time: "10:00 AM", duration: "1 hour", location: "Ang Mo Kio" },
  { id: 2, instructor: "Sarah Johnson", date: "2024-10-12", time: "2:00 PM", duration: "1 hour", location: "Bishan" },
  { id: 3, instructor: "Michael Tan", date: "2024-10-15", time: "11:00 AM", duration: "1 hour", location: "Tampines" },
  { id: 4, instructor: "Emily Wong", date: "2024-10-17", time: "1:00 PM", duration: "1 hour", location: "Jurong" },
  { id: 5, instructor: "David Lim", date: "2024-10-20", time: "9:00 AM", duration: "1 hour", location: "Woodlands" },
  { id: 6, instructor: "Lisa Chen", date: "2024-10-22", time: "3:00 PM", duration: "1 hour", location: "Sengkang" },
])

const currentPage = ref(1)
const lessonsPerPage = 4

const totalPages = computed(() => Math.ceil(lessons.value.length / lessonsPerPage))

const visibleLessons = computed(() => {
  const start = (currentPage.value - 1) * lessonsPerPage
  const end = start + lessonsPerPage
  return lessons.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}
</script>

<style scoped>
.lesson-list-move,
.lesson-list-enter-active,
.lesson-list-leave-active {
  transition: all 0.5s ease;
}

.lesson-list-enter-from,
.lesson-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.lesson-list-leave-active {
  position: absolute;
}
</style>