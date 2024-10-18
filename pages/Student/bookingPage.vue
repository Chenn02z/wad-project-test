<template>
    <div class="container mx-auto p-6 min-h-screen">
        <div class="space-y-2 mb-10">
            <h2 class="text-3xl font-bold tracking-tight">Availability</h2>
            <p class="text-lg text-gray-500">Select the instructor, location, date, and timeslot</p>
        </div>

        <div class="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
            <div v-if="isLoading" class="text-center py-8">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p class="mt-4 text-gray-600">Loading instructor data...</p>
            </div>
            <div v-else-if="error" class="text-center py-8">
                <p class="text-red-500">{{ error }}</p>
                <button @click="fetchInstructors" class="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Retry
                </button>
            </div>
            <form v-else @submit.prevent="confirmBooking" class="space-y-6">
                <div class="space-y-2">
                    <label for="location" class="block text-lg font-medium text-gray-700">Select Location</label>
                    <select v-model="selectedLocation" id="location" class="mt-1 block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md">
                        <option value="">Choose a location</option>
                        <option v-for="location in locations" :key="location.id" :value="location.location">{{ location.location }}</option>
                    </select>
                </div>

                <div v-if="selectedLocation" class="space-y-2">
                    <label for="instructor" class="block text-lg font-medium text-gray-700">Select Instructor</label>
                    <select v-model="selectedInstructor" id="instructor" class="mt-1 block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md">
                        <option value="">Choose an instructor</option>
                        <option v-for="instructor in filteredInstructors" :key="instructor.id" :value="instructor">{{ instructor.name }}</option>
                    </select>
                </div>

                <div v-if="selectedInstructor" class="space-y-2">
                    <label for="date" class="block text-lg font-medium text-gray-700">Select Date</label>
                    <select v-model="selectedDate" id="date" class="mt-1 block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md" @change="fetchAvailableSlots">
                        <option value="">Choose a date</option>
                        <option v-for="date in availableDates" :key="date" :value="date">{{ date }}</option>
                    </select>
                </div>

                <div v-if="selectedDate" class="space-y-2">
                    <label class="block text-lg font-medium text-gray-700">Select Time Slot</label>
                    <div class="grid grid-cols-3 gap-3">
                        <button v-for="slot in availableSlots" :key="slot.time" type="button"
                            :disabled="!slot.available"
                            :class="['p-3 text-base font-medium rounded-md', slot.available ? 'bg-purple-200 text-purple-700 hover:bg-purple-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed', selectedSlot === slot ? 'ring-2 ring-purple-500' : '']"
                            @click="selectSlot(slot)">
                            {{ slot.time }}
                        </button>
                    </div>
                </div>

                <button type="submit" class="w-full px-6 py-3 text-base font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    :disabled="!selectedInstructor || !selectedDate || !selectedSlot">
                    Confirm Booking
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'studentview'
});
import { ref, computed, onMounted } from 'vue'

// Initialize Supabase client
const client = useSupabaseClient()

// Reactive references for data
const locations = ref([])
const instructors = ref([])
const selectedLocation = ref('')
const selectedInstructor = ref('')
const selectedDate = ref('')
const selectedSlot = ref(null)
const isLoading = ref(false)
const error = ref('')
const availableDates = ref([])
const availableSlots = ref([]);

// Filter instructors based on selected location
const filteredInstructors = computed(() => {
    return selectedLocation.value ? instructors.value.filter(instructor => instructor.location === selectedLocation.value) : instructors.value;
});

// Fetch locations from Supabase
async function fetchLocations() {
    try {
        const { data, error: fetchError } = await client
            .from('instructors')
            .select('location')
        if (fetchError) throw fetchError
        locations.value = [...new Set(data.map(item => item.location))].map(location => ({ location }));
    } catch (err) {
        console.error('Error fetching locations:', err)
    }
}

// Fetch instructors from Supabase
async function fetchInstructors() {
    isLoading.value = true;
    try {
        const { data, error: fetchError } = await client
            .from('instructors')
            .select('*');
        if (fetchError) throw fetchError;
        instructors.value = data ?? [];
    } catch (err) {
        error.value = 'Error fetching instructors';
        console.error('Error fetching instructors:', err);
    } finally {
        isLoading.value = false;
    }
}

import dayjs from 'dayjs';

async function populateAvailableDates() {
    availableDates.value = [];
    for (let i = 1; i < 7; i++) {
        availableDates.value.push(dayjs().add(i, 'day').format('YYYY-MM-DD'));
    }
}

async function fetchAvailableSlots() {
    if (!selectedInstructor.value || !selectedDate.value) return;

    isLoading.value = true;
    availableSlots.value = [];

    try {
        const { data, error } = await client
            .from('availability')
            .select('*')
            .eq('instructor_id', selectedInstructor.value.id)
            .eq('date', selectedDate.value);
        
        if (error) throw error;
        availableSlots.value = data ?? [];
    } catch (err) {
        error.value = `Error fetching available slots: ${err.message}`;
        console.error('Error fetching available slots:', err);
    } finally {
        isLoading.value = false;
    }
}

// Function to handle slot selection
function selectSlot(slot) {
    selectedSlot.value = slot;
}

async function confirmBooking() {
    if (!selectedSlot.value) return;  // Early return if no slot is selected

    try {
        // Prepare booking data
        const bookingData = {
            instructor: selectedInstructor.value.name, // Ensure this contains the correct instructor ID
            date: selectedDate.value,
            time: selectedSlot.value.time,
            location: selectedLocation.value, // Ensure this is accessed correctly
            student_id: 101 // Replace with dynamic student ID as needed
        };

        // Insert the booking into the database
        const { error: insertError } = await client
            .from('lessons')
            .insert([bookingData]);

        // Handle any errors from the insert operation
        if (insertError) throw insertError;

        // Update the availability of the selected time slot
        const { error: updateError } = await client
            .from('availability')
            .update({ available: false }) // Set availability to FALSE
            .eq('instructor_id', selectedInstructor.value.id) // Assuming your instructor object has an id
            .eq('date', selectedDate.value)
            .eq('time', selectedSlot.value.time); // Match the time slot being booked

        // Handle any errors from the update operation
        if (updateError) throw updateError;

        fetchAvailableSlots();

        // Notify the user of success
        alert('Booking confirmed!');



    } catch (err) {
        // Log and display the error
        console.error('Error confirming booking:', err);
        error.value = 'Error confirming booking: ' + err.message; // Display specific error message
    }
}



// On mounted lifecycle hook to fetch data
onMounted(() => {
    fetchLocations();
    fetchInstructors();
    populateAvailableDates();
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>
