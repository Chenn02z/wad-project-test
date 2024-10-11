<template>
    <div class="mt-4">
      <div class="flex justify-center space-x-4">
        <div v-for="(day, index) in days" :key="index" class="text-center">
          <div 
            class="bg-gray-100 p-6 rounded-lg cursor-pointer" 
            :class="{ 'selected': selectedDay === day }"
            @click="selectDay(day)"
          >
            <div class="text-gray-500">{{ day.label }}</div>
            <div class="text-lg font-bold">{{ day.date }}</div>
            <div v-if="day.isAvailable" class="text-green-500">Available</div>
            <div v-else class="text-red-500">Unavailable</div>
          </div>
        </div>
      </div>
  
      <!-- Show slots only if a day is selected -->
      <div v-if="selectedDay" class="mt-6 grid grid-cols-3 gap-4">
        <button
          v-for="(slot, index) in slots"
          :key="index"
          class="border p-3 rounded-lg hover:bg-purple-100 focus:outline-none"
          :class="{ 'bg-purple-200': selectedSlots.includes(slot) }"
          @click="toggleSlot(slot)"
        >
          {{ slot }}
        </button>
      </div>
  
      <!-- Submit button -->
      <div v-if="selectedDay" class="mt-4">
        <button 
          class="bg-blue-500 text-white px-4 py-2 rounded-lg"
          @click="submitAvailability"
        >
          Submit Availability
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Define the days with initial unavailable status
  const days = ref([
    { label: 'Mon', date: '11', isAvailable: false },
    { label: 'Tue', date: '12', isAvailable: false },
    { label: 'Wed', date: '13', isAvailable: false },
    { label: 'Thu', date: '14', isAvailable: false },
    { label: 'Fri', date: '15', isAvailable: false },
    { label: 'Sat', date: '16', isAvailable: false },
    { label: 'Sun', date: '17', isAvailable: false },
  ]);
  
  // Define slots
  const slots = ref([
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
  ]);
  
  const selectedDay = ref(null); // Track the selected day
  const selectedSlots = ref([]); // Track the selected slots
  
  // Handle selecting a day
  const selectDay = (day) => {
    if (selectedDay.value === day) {
      selectedDay.value = null; // Deselect if clicked again
    } else {
      selectedDay.value = day;
      day.isAvailable = true; // Mark the day as available
      selectedSlots.value = [...slots.value]; // Pre-select all slots
    }
  };
  
  // Handle toggling slot selection
  const toggleSlot = (slot) => {
    const index = selectedSlots.value.indexOf(slot);
    if (index !== -1) {
      selectedSlots.value.splice(index, 1); // Deselect slot
    } else {
      selectedSlots.value.push(slot); // Select slot
    }
  };
  
  // Handle submitting availability
  const submitAvailability = () => {
    const availability = {
      day: selectedDay.value.label,
      selectedSlots: selectedSlots.value,
    };
    console.log('Submitted availability:', availability);
    alert(`Availability for ${availability.day}: ${availability.selectedSlots.join(', ')}`);
  };
  </script>
  
  <style scoped>
  .selected {
    border: 2px solid #7c3aed; /* Highlight color for selected day */
  }
  
  button.bg-purple-200 {
    background-color: #d8b4fe; /* Color for selected slots */
  }
  </style>
  
  