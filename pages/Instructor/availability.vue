<template>
  
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Availability
      </h2>
      <p class="text-muted-foreground">
        Select the days and timeslots
      </p>
    </div>
    <div class="p-6 max-w-md mx-auto">
    <DaySelector />
    <TimeSlots />
  </div>

</template>

<script setup lang="ts">
definePageMeta({
  layout: 'instructorview'
})

import DaySelector from '@/components/scheduler/dayselector.vue'
</script>