<template>
    <div class="flex flex-col p-6">
      <h1 class="text-3xl font-bold mb-4">Resources</h1>
      <div class="bg-white rounded-lg shadow-lg p-4">
        <ul>
          <li class="py-2 border-b">
            <a href="https://www.example.com/driving-manual" class="text-blue-500 hover:underline" target="_blank">Driving Manual</a>
          </li>
          <li class="py-2 border-b">
            <a href="https://www.example.com/tutorial-video" class="text-blue-500 hover:underline" target="_blank">Video Tutorials</a>
          </li>
          <li class="py-2 border-b">
            <a href="https://www.example.com/driving-tips" class="text-blue-500 hover:underline" target="_blank">Driving Tips</a>
          </li>
          <li class="py-2 border-b">
            <a href="https://www.example.com/road-signs" class="text-blue-500 hover:underline" target="_blank">Road Signs Guide</a>
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