<script setup lang="ts">
definePageMeta({
  layout: "instructorview",
});

import { CurrentStudents } from '@/data/students';

const students = CurrentStudents;
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Current Students</h1>
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

.cards-container {
  display: inline-flex;
  gap: 1rem;
}

.student-card {
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 16rem; /* Fixed width to control card size */
}
</style>
