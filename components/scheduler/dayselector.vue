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
        :class="{ 'bg-purple-200': selectedSlots.includes(slot.start) }"
        @click="toggleSlot(slot)"
      >
        {{ slot.label }}
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

    <!-- Display upcoming availability -->
    <div class="mt-8">
      <h3 class="text-2xl font-bold">Upcoming Availability</h3>
      <div v-if="groupedAvailability && Object.keys(groupedAvailability).length > 0" class="mt-4 space-y-6">
        <div v-for="(slots, date) in groupedAvailability" :key="date">
          <h4 class="text-lg font-bold">{{ date }}</h4>
          <ul class="ml-4 mt-2">
            <li v-for="(slot, index) in slots" :key="index" class="bg-gray-100 p-3 rounded-md mb-2">
              {{ slot }}
            </li>
          </ul>
        </div>
      </div>
      <p v-else class="mt-4 text-gray-500">No upcoming availability set.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';

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

// Define 2-hour slots
const slots = ref([
  { label: '8:00 AM - 10:00 AM', start: '08:00:00' },
  { label: '10:00 AM - 12:00 PM', start: '10:00:00' },
  { label: '12:00 PM - 2:00 PM', start: '12:00:00' },
  { label: '2:00 PM - 4:00 PM', start: '14:00:00' },
  { label: '4:00 PM - 6:00 PM', start: '16:00:00' },
  { label: '6:00 PM - 8:00 PM', start: '18:00:00' },
  { label: '8:00 PM - 10:00 PM', start: '20:00:00' },
]);

// Create a mapping of start time to slot label
const slotMap = slots.value.reduce((map, slot) => {
  map[slot.start] = slot.label;
  return map;
}, {});

const selectedDay = ref(null); // Track the selected day
const selectedSlots = ref([]); // Track the start time of selected slots
const groupedAvailability = ref({}); // Track upcoming availability by date

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
  const index = selectedSlots.value.indexOf(slot.start);
  if (index !== -1) {
    selectedSlots.value.splice(index, 1); // Deselect slot
  } else {
    selectedSlots.value.push(slot.start); // Select slot
  }
};

// Handle submitting availability
const submitAvailability = async () => {
  if (!selectedDay.value || selectedSlots.value.length === 0) return;

  // Prepare the data to insert into the Supabase table
  const availabilityData = selectedSlots.value.map((start) => ({
    instructor_id: 1, // Replace with the actual instructor ID
    date: selectedDay.value.fullDate, // Use the full date string
    time: start, // Only send the start time of the selected slot
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
    fetchUpcomingAvailability(); // Refresh upcoming availability after adding new ones
  } catch (err) {
    console.error('Unexpected error:', err);
    alert('An unexpected error occurred.');
  }
};

// Fetch upcoming availability
const fetchUpcomingAvailability = async () => {
  try {
    const today = dayjs().format('YYYY-MM-DD');
    const { data, error } = await client
      .from('availability') // Replace with your actual table name
      .select('date, time')
      .gte('date', today) // Get only future dates including today
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      console.error('Error fetching upcoming availability:', error);
      return;
    }

    // Group availability by date
    const grouped = {};
    data.forEach(item => {
      const formattedDate = dayjs(item.date).format('dddd, MMMM D');
      const slotLabel = slotMap[item.time] || `${item.time} (Unmapped)`;

      if (!grouped[formattedDate]) {
        grouped[formattedDate] = [];
      }
      grouped[formattedDate].push(slotLabel);
    });

    groupedAvailability.value = grouped;
  } catch (err) {
    console.error('Unexpected error fetching upcoming availability:', err);
  }
};

// Fetch upcoming availability on component mount
onMounted(() => {
  fetchUpcomingAvailability();
});
</script>

<style scoped>
.selected {
  border: 2px solid #7c3aed; /* Highlight color for selected day */
}

button.bg-purple-200 {
  background-color: #d8b4fe; /* Color for selected slots */
}
</style>
