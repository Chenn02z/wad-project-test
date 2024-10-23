<template>
  <div>
    <h2>Add Driving Lesson Event</h2>
    <form @submit.prevent="addEvent">
      <div>
        <label>Start Time:</label>
        <input v-model="startDateTime" type="datetime-local" required />
      </div>

      <div>
        <label>Instructor ID:</label>
        <input v-model="instructorId" type="text" placeholder="Instructor ID" required />
      </div>

      <div>
        <label>Student ID:</label>
        <input v-model="studentId" type="text" placeholder="Student ID" required />
      </div>

      <button type="submit">Add Event</button>
    </form>

    <!-- Show success or error messages -->
    <p v-if="eventId">Event Created with ID: {{ eventId }}</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">

definePageMeta({
  layout: 'instructorview'
})


import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const startDateTime = ref('');
    const instructorId = ref('');
    const studentId = ref('');
    const eventId = ref('');
    const errorMessage = ref('');

    const addEvent = async () => {
      try {
        const response = await $fetch<{ success: boolean; eventId?: string; message?: string }>('/api/addEvents', {
          method: 'POST',
          body: {
            startDateTime: new Date(startDateTime.value).toISOString(),
            instructorId: instructorId.value,
            studentId: studentId.value,
          },
        });

        if (response.success) {
          eventId.value = response.eventId || '';
          errorMessage.value = ''; // Clear error message if successful
        } else {
          errorMessage.value = response.message || 'Failed to add event';
        }
      } catch (error) {
        errorMessage.value = 'API call failed: ' + (error instanceof Error ? error.message : String(error));
      }
    };

    return {
      startDateTime,
      instructorId,
      studentId,
      eventId,
      errorMessage,
      addEvent,
    };
  },
});
</script>



