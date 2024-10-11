<script setup lang='ts'>
definePageMeta({
  layout: 'studentview'
});

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'

// Define types for Instructor and TimeSlot
interface Instructor {
  id: number;
  name: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

// Reactive state variables
const selectedInstructor = ref<string | null>(null);
const selectedDate = ref<string | null>(null);
const selectedSlot = ref<TimeSlot | null>(null);

// Sample instructors
const instructors: Instructor[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

// Generate random time slots
const timeSlots = ref<TimeSlot[]>(generateTimeSlots());

// Date restrictions for booking
const minDate = getFormattedDate(new Date()); // Today's date
const maxDate = getFormattedDate(addDays(new Date(), 7)); // One week from today

// Function to generate time slots
function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 21; hour++) {
    const time = hour < 12 ? `${hour}:00 AM` : `${hour === 12 ? hour : hour - 12}:00 PM`;
    slots.push({ time, available: Math.random() > 0.3 }); // Random availability for now
  }
  return slots;
}

// Function to select a time slot
function selectSlot(slot: TimeSlot): void {
  if (slot.available) {
    selectedSlot.value = slot;
  }
}

// Function to confirm booking
function confirmBooking(): void {
  if (selectedInstructor.value && selectedDate.value && selectedSlot.value) {
    alert(`Booking confirmed with ${selectedInstructor.value} on ${selectedDate.value} at ${selectedSlot.value.time}`);
  } else {
    alert("Please complete all selections.");
  }
}

// Helper function to add days to a date
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Helper function to format date
function getFormattedDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
</script>

<template>
  <div class="flex flex-col min-h-screen p-6">
    <!-- Booking Card -->
    <div class="flex justify-center items-center flex-grow">
      <Card class="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>Book Your Next Lesson</CardTitle>
          <CardDescription>Select your preferences below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="confirmBooking" class="space-y-4">
            <!-- Instructor Selection -->
            <div class="flex flex-col space-y-1.5">
              <Label for="instructor">Select Instructor:</Label>
              <Select v-model="selectedInstructor" id="instructor">
                <SelectTrigger>
                  <SelectValue placeholder="Select Instructor" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem v-for="instructor in instructors" :key="instructor.id" :value="instructor.name">
                    {{ instructor.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- Date Selection -->
            <div class="flex flex-col space-y-1.5">
              <Label for="date">Select Date:</Label>
              <Input
                type="date"
                id="date"
                v-model="selectedDate"
                :min="minDate"
                :max="maxDate"
                class="bg-gray-100"
              />
            </div>

            <!-- Time Slot Selection -->
            <div>
              <Label>Select Time Slot:</Label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                <Button
                  v-for="slot in timeSlots"
                  :key="slot.time"
                  :disabled="!slot.available"
                  @click.prevent="selectSlot(slot)"
                  :class="[ 
                    'p-3 rounded-md text-white', 
                    slot.available ? 'bg-green-500' : 'bg-gray-400', 
                    selectedSlot === slot ? 'ring-2 ring-blue-400' : '' 
                  ]"
                >
                  {{ slot.time }}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button variant="outline" @click.prevent="selectedInstructor = null; selectedDate = null; selectedSlot = null">
            Cancel
          </Button>
          <Button type="submit" @click.prevent="confirmBooking" :disabled="!selectedInstructor || !selectedDate || !selectedSlot">
            Confirm Booking
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles for your layout */
</style>
