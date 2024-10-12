<script setup lang="ts">
definePageMeta({
  layout: "instructorview",
});

import { CurrentStudents } from '@/data/students';

const students = CurrentStudents;
</script>

<template>
  <div>
    <!-- i cant seem to get the scroll to be only for the container -->
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Current Students
      </h2>
      <p class="text-muted-foreground">
        See your students!
      </p>
    </div>
    <div class="cards-container-wrapper">
      <div class="cards-container">
        <div v-for="student in students" :key="student.name" class="p-6 bg-white shadow-md rounded-md student-card">
          <img src="https://via.placeholder.com/150" alt="Student Photo" class="w-full rounded-md mb-4" />
          <h2 class="text-xl font-semibold">{{ student.name }}</h2>
          <p class="mt-2">Date: {{ student.date }}</p>
          <p>Time: {{ student.time }}</p>
          <p>Location: {{ student.location }}</p>
        </div>
      </div>
    </div>
    <hr>
    <div>other stuff</div>
  </div>
</template>

<style scoped>
.cards-container-wrapper {
  width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling */
  white-space: nowrap; /* Prevent line breaks so that the items stay in one row */
  padding: 1rem;
}

.cards-container {
  display: inline-flex;
  gap: 1rem;
}

.student-card {
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 16rem;
}
</style>
