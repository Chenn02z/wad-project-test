<template>
    <div class="flex">
      <!-- Name and Task Table -->
      <div class="w-1/4 p-4 border-r border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell class="text-left font-bold">Name</TableCell>
              <TableCell class="text-left font-bold">NBR Tasks</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="user in users"
              :key="user.id"
              class="border-t"
            >
              <TableCell class="flex items-center space-x-4">
                <img :src="user.avatar" alt="Avatar" class="w-8 h-8 rounded-full" />
                <div>
                  <p class="font-medium">{{ user.name }}</p>
                  <p class="text-xs text-gray-500">{{ user.role }}</p>
                </div>
              </TableCell>
              <TableCell class="text-center font-medium">{{ user.tasks }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
  
      <!-- Calendar Section -->
      <div class="w-3/4 p-4 overflow-x-auto">
        <!-- Time header with dividers -->
        <div class="grid grid-cols-9 gap-0 border-b">
          <div v-for="hour in hours" :key="hour" class="text-center font-bold border-r py-2">
            {{ hour }}:00
          </div>
        </div>
  
        <!-- Task Rows with different activities and times -->
        <div v-for="user in users" :key="user.id" class="grid grid-cols-9 gap-0 border-b py-2 relative">
          <template v-for="activity in user.activities" :key="activity.name">
            <div
              :class="['flex items-center justify-center text-white rounded px-2 py-1', activity.color]"
              :style="{
                gridColumnStart: activity.startHour + 1,
                gridColumnEnd: `span ${activity.duration}`,
              }"
            >
              <span>{{ activity.name }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table' // Adjust based on actual import paths
  
  interface Activity {
    name: string
    startHour: number // Column start (0-based for easier calculation)
    duration: number // Duration in hours
    color: string // Tailwind color class
  }
  
  interface User {
    id: number
    name: string
    role: string
    avatar: string
    tasks: number
    activities: Activity[]
  }
  
  const users = ref<User[]>([
    {
      id: 1,
      name: 'Arcady',
      role: 'Core developer',
      avatar: '/path/to/avatar1.jpg',
      tasks: 2,
      activities: [
        { name: 'Restart server', startHour: 1, duration: 2, color: 'bg-blue-500' },
        { name: 'Upgrade memory', startHour: 5, duration: 2, color: 'bg-purple-500' },
      ],
    },
    {
      id: 2,
      name: 'Dave',
      role: 'Tech Sales',
      avatar: '/path/to/avatar2.jpg',
      tasks: 1,
      activities: [
        { name: 'Visit customer', startHour: 2, duration: 3, color: 'bg-green-500' },
      ],
    },
    {
      id: 3,
      name: 'Henrik',
      role: 'Sales',
      avatar: '/path/to/avatar3.jpg',
      tasks: 1,
      activities: [
        { name: 'Arrange meetup', startHour: 3, duration: 2, color: 'bg-green-500' },
      ],
    },
    // Add more users as needed
  ])
  
  const hours = ref(['08', '09', '10', '11', '12', '13', '14', '15', '16'])
  </script>
  
  <style scoped>
  /* Ensure grid lines show clearly */
  .grid > .border-r {
    border-color: #e2e8f0;
  }
  </style>
  