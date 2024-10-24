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
import dayjs from 'dayjs'; // Make sure to install dayjs via npm

// Configure Supabase client
const client = useSupabaseClient()

// Define the next 7 days from tomorrow
const generateNext7Days = () => {
  const daysArray = [];
  for (let i = 1; i <= 7; i++) {
    const date = dayjs().add(i, 'day');
    daysArray.push({
      label: date.format('ddd'), // e.g., "Mon"
      date: date.format('DD'),   // e.g., "11"
      fullDate: date.format('YYYY-MM-DD'), // Full date for later use
      isAvailable: false
    });
  }
  return daysArray;
};

const days = ref(generateNext7Days());

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
    selectedSlots.value = []; // Clear previous selections
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
const submitAvailability = async () => {
  if (!selectedDay.value || selectedSlots.value.length === 0) return;

  // Prepare the data to insert into the Supabase table
  const availabilityData = selectedSlots.value.map((slot) => ({
    instructor_id: 1, // Replace with the actual instructor ID
    date: selectedDay.value.fullDate, // Use the full date string
    time: slot,
    available: true, // Ensure the slot is marked as available
  }));

  try {
    // Insert availability data into Supabase
    const { error: insertError } = await client
      .from('availability') // Replace with your actual table name
      .insert(availabilityData);

    if (insertError) {
      console.error('Error inserting data:', insertError);
      alert('Duplicate availability selected.');
      return;
    }

    alert('Availability updated successfully!');
  } catch (err) {
    console.error('Unexpected error:', err);
    alert('An unexpected error occurred.');
  }
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
