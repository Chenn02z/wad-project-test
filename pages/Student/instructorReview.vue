<template>
    <div class="flex flex-col p-6">
      <h1 class="text-3xl font-bold mb-4">Instructor Reviews</h1>
      <div class="bg-white rounded-lg shadow-lg p-4">
        <ul>
          <li class="py-2 border-b">
            <h2 class="text-xl font-semibold">John Doe</h2>
            <p class="text-gray-600">Rating: ⭐⭐⭐⭐⭐</p>
            <p>John is very patient and explains concepts clearly.</p>
          </li>
          <li class="py-2 border-b">
            <h2 class="text-xl font-semibold">Jane Smith</h2>
            <p class="text-gray-600">Rating: ⭐⭐⭐⭐</p>
            <p>Jane provides excellent feedback and is very encouraging.</p>
          </li>
          <li class="py-2 border-b">
            <h2 class="text-xl font-semibold">Mark Johnson</h2>
            <p class="text-gray-600">Rating: ⭐⭐⭐</p>
            <p>Mark was good, but could improve on pacing the lessons.</p>
          </li>
        </ul>
      </div>
    </div>
  </template>

<script setup lang="ts">
definePageMeta({
  layout: 'studentview'
})
</script>