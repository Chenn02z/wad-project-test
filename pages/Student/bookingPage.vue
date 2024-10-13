<script setup>
definePageMeta({
  layout: 'studentview'
});
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

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
    alert(`Booking confirmed with ${selectedInstructor.value.name} on ${selectedDate.value} at ${selectedSlot.value.time}`)
    // Here you would typically make an API call to save the booking
    // For now, we'll just reset the form
    selectedInstructor.value = null
    selectedDate.value = null
    selectedSlot.value = null
  } else {
    alert('Please complete all selections before confirming.')
  }
}

onMounted(fetchInstructors)
</script>

<template>
  <div class="container mx-auto p-4">
    <Card class="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Book Your Lesson</CardTitle>
        <CardDescription>Choose your instructor, date, and time</CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="isLoading" class="text-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading instructor data...</p>
        </div>
        <div v-else-if="error" class="text-center py-8">
          <p class="text-red-500">{{ error }}</p>
          <Button @click="fetchInstructors" class="mt-4">Retry</Button>
        </div>
        <form v-else @submit.prevent="confirmBooking" class="space-y-4">
          <div class="space-y-2">
            <Label for="instructor">Select Instructor</Label>
            <Select v-model="selectedInstructor">
              <SelectTrigger>
                <SelectValue placeholder="Choose an instructor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="instructor in instructors" :key="instructor.id" :value="instructor">
                  {{ instructor.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div v-if="selectedInstructor" class="space-y-2">
            <Label for="date">Select Date</Label>
            <Select v-model="selectedDate">
              <SelectTrigger>
                <SelectValue placeholder="Choose a date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="date in availableDates" :key="date" :value="date">
                  {{ new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div v-if="selectedDate" class="space-y-2">
            <Label>Select Time Slot</Label>
            <div class="grid grid-cols-3 gap-2">
              <Button
                v-for="slot in availableSlots"
                :key="slot.time"
                :disabled="!slot.available"
                :class="[
                  'p-2',
                  slot.available ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300',
                  selectedSlot === slot ? 'ring-2 ring-blue-500' : ''
                ]"
                @click="selectSlot(slot)"
              >
                {{ slot.time }}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          class="w-full" 
          @click="confirmBooking"
          :disabled="!selectedInstructor || !selectedDate || !selectedSlot"
        >
          Confirm Booking
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>