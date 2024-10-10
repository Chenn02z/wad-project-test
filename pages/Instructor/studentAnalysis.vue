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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="student in students" :key="student.name" class="p-6 bg-white shadow-md rounded-md">
        <h2 class="text-xl font-semibold">{{ student.name }}</h2>
        <p class="mt-2">Date: {{ student.date }}</p>
        <p>Time: {{ student.time }}</p>
        <p>Location: {{ student.location }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any homepage-specific styling */
</style>