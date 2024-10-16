<template>
  <div class="container mx-auto p-4">
    <div class="space-y-0.5 mb-6">
      <h2 class="text-2xl font-bold tracking-tight">
        Availability
      </h2>
      <p class="text-muted-foreground">
        Select the instructor, date, and timeslot
      </p>
    </div>

    <div class="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div v-if="isLoading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading instructor data...</p>
      </div>
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-500">{{ error }}</p>
        <button @click="fetchInstructors" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Retry</button>
      </div>
      <form v-else @submit.prevent="confirmBooking" class="space-y-4">
        <div class="space-y-2">
          <label for="instructor" class="block text-sm font-medium text-gray-700">Select Instructor</label>
          <select v-model="selectedInstructor" id="instructor" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option value="">Choose an instructor</option>
            <option v-for="instructor in instructors" :key="instructor.id" :value="instructor">
              {{ instructor.name }}
            </option>
          </select>
        </div>

        <div v-if="selectedInstructor" class="space-y-2">
          <label for="date" class="block text-sm font-medium text-gray-700">Select Date</label>
          <select v-model="selectedDate" id="date" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option value="">Choose a date</option>
            <option v-for="date in availableDates" :key="date" :value="date">
              {{ formatDate(date) }}
            </option>
          </select>
        </div>

        <div v-if="selectedDate" class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Select Time Slot</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="slot in availableSlots"
              :key="slot.time"
              type="button"
              :disabled="!slot.available"
              :class="[
                'p-2 text-sm font-medium rounded-md',
                slot.available ? 'bg-purple-200 text-purple-700 hover:bg-purple-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed',
                selectedSlot === slot ? 'ring-2 ring-purple-500' : ''
              ]"
              @click="selectSlot(slot)"
            >
              {{ slot.time }}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="!selectedInstructor || !selectedDate || !selectedSlot"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'studentview'
});
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const instructors = ref([])
const selectedInstructor = ref(null)
const selectedDate = ref(null)
const selectedSlot = ref(null)
const isLoading = ref(true)
const error = ref(null)

const availableDates = computed(() => {
  if (!selectedInstructor.value) return []
  return selectedInstructor.value.availability.map(day => day.date)
})

const availableSlots = computed(() => {
  if (!selectedInstructor.value || !selectedDate.value) return []
  const day = selectedInstructor.value.availability.find(day => day.date === selectedDate.value)
  return day ? day.slots : []
})

async function fetchInstructors() {
  try {
    isLoading.value = true
    error.value = null
    const response = await axios.get('/api/instructors.json')
    instructors.value = response.data.instructors
  } catch (err) {
    error.value = 'Failed to load instructor data. Please try again later.'
    console.error('Error fetching data:', err)
  } finally {
    isLoading.value = false
  }
}

function selectSlot(slot) {
  if (slot.available) {
    selectedSlot.value = slot
  }
}

function confirmBooking() {
  if (selectedInstructor.value && selectedDate.value && selectedSlot.value) {
    alert(`Booking confirmed with ${selectedInstructor.value.name} on ${formatDate(selectedDate.value)} at ${selectedSlot.value.time}`)
    // Here you would typically make an API call to save the booking
    // For now, we'll just reset the form
    selectedInstructor.value = null
    selectedDate.value = null
    selectedSlot.value = null
  } else {
    alert('Please complete all selections before confirming.')
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(fetchInstructors)
</script>

<style scoped>
/* Add any additional styles here */
</style>