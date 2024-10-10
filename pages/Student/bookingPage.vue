<template>
    <div>
      <h1 class="text-3xl font-bold mb-4">Book Your Next Lesson</h1>
      <form @submit.prevent="confirmBooking" class="space-y-6">
        <!-- Instructor Selection -->
        <div>
          <label for="instructor" class="block text-lg">Select Instructor:</label>
          <select v-model="selectedInstructor" id="instructor" class="bg-gray-100 p-3 rounded-md w-full">
            <option v-for="instructor in instructors" :key="instructor.id" :value="instructor.name">
              {{ instructor.name }}
            </option>
          </select>
        </div>
  
        <!-- Date Selection (Next Week Only) -->
        <div>
          <label for="date" class="block text-lg">Select Date:</label>
          <input
            type="date"
            id="date"
            v-model="selectedDate"
            :min="minDate"
            :max="maxDate"
            class="bg-gray-100 p-3 rounded-md w-full"
          />
        </div>
  
        <!-- Time Slot Selection -->
        <div>
          <label for="timeslot" class="block text-lg">Select Time Slot:</label>
          <div class="grid grid-cols-3 gap-4">
            <button
              v-for="slot in timeSlots"
              :key="slot.time"
              :disabled="!slot.available"
              @click.prevent="selectSlot(slot)"
              :class="['p-3 rounded-md text-white', slot.available ? 'bg-green-500' : 'bg-gray-400', selectedSlot === slot ? 'ring-2 ring-blue-400' : '']">
              {{ slot.time }}
            </button>
          </div>
        </div>
  
        <!-- Confirm Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-3 rounded-md"
          :disabled="!selectedInstructor || !selectedDate || !selectedSlot"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface Instructor {
    id: number;
    name: string;
  }
  
  interface TimeSlot {
    time: string;
    available: boolean;
  }
  
  const selectedInstructor = ref<string | null>(null);
  const selectedDate = ref<string | null>(null);
  const selectedSlot = ref<TimeSlot | null>(null);
  
  const instructors: Instructor[] = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];
  
  const timeSlots = ref<TimeSlot[]>(generateTimeSlots());
  
  const minDate = getFormattedDate(new Date()); // Today's date
  const maxDate = getFormattedDate(addDays(new Date(), 7)); // One week from today
  
  function generateTimeSlots(): TimeSlot[] {
    // Generate time slots from 9 AM to 9 PM with 1-hour intervals
    const slots: TimeSlot[] = [];
    for (let hour = 9; hour <= 21; hour++) {
      const time = hour < 12 ? `${hour}:00 AM` : `${hour === 12 ? hour : hour - 12}:00 PM`;
      slots.push({ time: time, available: Math.random() > 0.3 }); // Random availability for now
    }
    return slots;
  }
  
  function selectSlot(slot: TimeSlot): void {
    if (slot.available) {
      selectedSlot.value = slot;
    }
  }
  
  function confirmBooking(): void {
    if (selectedInstructor.value && selectedDate.value && selectedSlot.value) {
      alert(`Booking confirmed with ${selectedInstructor.value} on ${selectedDate.value} at ${selectedSlot.value.time}`);
    } else {
      alert("Please complete all selections.");
    }
  }
  
  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  function getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  definePageMeta({
  layout: 'studentview'
})

  </script>
  
  <style scoped>
  /* Add any booking-specific styling here */
  </style>