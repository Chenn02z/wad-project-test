<template>
  <div>
    <h3>Add Event</h3>
    <br />
    <form @submit.prevent="addEvent">
      <!-- Summary and description are automatically handled -->
      <label>Start Time:</label>
      <input v-model="startDateTime" type="datetime-local" />
      <br />
      <label>Instructor ID:</label>
      <input v-model="instructorId" type="text" placeholder="Instructor ID" />
      <br />
      <label>Student ID:</label>
      <input v-model="studentId" type="text" placeholder="Student ID" />
      <br />
      <button type="submit">Add Event</button>
    </form>
    <br />
    <p v-if="successMessage">{{ successMessage }}</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  layout: 'instructorview'
})

// Reactive properties for form inputs
const startDateTime = ref('');
const instructorId = ref('');
const studentId = ref('');

const successMessage = ref('');
const errorMessage = ref('');

// Function to add an event
const addEvent = async () => {
  try {
    // Automatically generate the summary and description
    const summary = 'Driving Lesson';
    const description = `Instructor: ${instructorId.value}, <br> Student: ${studentId.value}`;

    // Calculate end time: 1 hour after start time
    const start = new Date(startDateTime.value);
    const end = new Date(start);
    end.setHours(start.getHours() + 1);
    const endDateTime = end.toISOString();

    // Use Nuxt's useFetch to send the request
    const { data, error } = await useFetch('/api/addEvent', {
      method: 'POST',
      body: {
        summary,
        description,
        startDateTime: start.toISOString(),
        endDateTime,
        instructorId: instructorId.value,
        studentId: studentId.value,
      },
    });

    // Check if there's an error
    if (error.value) {
      const errorDetails = error.value?.data?.message || error.value.statusText || 'Failed to add event';
      throw new Error(errorDetails);
    }

    successMessage.value = data.value?.message || 'Event added successfully';

  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : String(err);
  }
};
</script>


