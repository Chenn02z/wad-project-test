<script setup lang="ts">
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ref, onMounted } from "vue";
import { useFetch } from "#app";

interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  extendedProperties?: {
    private?: {
      instructor_id?: string;
      student_id?: string;
    };
  };
}

// State variables
const weeklyEvents = ref<CalendarEvent[]>([]); // Events for the current week
const groupedEvents = ref<Record<string, CalendarEvent[]>>({}); // Grouped events by date
const isLoading = ref(false); // Loading state

// Function to fetch weekly events
const fetchWeeklyEvents = async (startDate: string) => {
  isLoading.value = true;
  try {
    const { data, error } = await useFetch<{ success: boolean; data?: CalendarEvent[] }>("/api/getEvent", {
      params: { timeMin: startDate },
    });

    if (error.value) {
      throw new Error(error.value.message || "Failed to fetch events");
    }

    if (data.value?.success && data.value.data) {
      weeklyEvents.value = data.value.data;
      groupEventsByDate();
    } else {
      weeklyEvents.value = [];
      groupedEvents.value = {};
    }
  } catch (err) {
    console.error(err);
    weeklyEvents.value = [];
    groupedEvents.value = {};
  } finally {
    isLoading.value = false;
  }
};

// Function to group events by date
const groupEventsByDate = () => {
  groupedEvents.value = weeklyEvents.value.reduce((acc, event) => {
    const eventDate = event.start?.dateTime?.split("T")[0] || event.start?.date || "Unknown";
    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }
    acc[eventDate].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);
};

// Fetch the events when the component mounts
onMounted(() => {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Start from Monday
  const startDate = startOfWeek.toISOString().split("T")[0]; // ISO format YYYY-MM-DD
  fetchWeeklyEvents(startDate); // Fetch events for the current week
});

// Helper function to format time
const formatTime = (dateTime: string | undefined): string => {
  if (!dateTime) return "All day";
  const date = new Date(dateTime);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};

// Helper function to check if the date is today
const isToday = (date: string): boolean => {
  const today = new Date().toISOString().split("T")[0];
  return date === today;
};

// Helper function to format date
const formatDate = (dateTime: string | undefined): string => {
  if (!dateTime) return "N/A";
  const date = new Date(dateTime);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};
</script>

<template>
  <CardHeader>
    <CardTitle>Weekly Lessons</CardTitle>
  </CardHeader>
  <CardContent class="pl-2">
    <ScrollArea class="w-100% whitespace-nowrap">
      <div v-if="isLoading">
        <p>Loading events...</p>
      </div>

      <!-- Loop through grouped events -->
      <div v-if="!isLoading && Object.keys(groupedEvents).length">
        <div v-for="(events, date) in groupedEvents" :key="date" class="inline-block w-1/4 mr-4">
          <Card class="mb-4">
            <CardHeader>
              <CardTitle :class="isToday(date) ? 'text-red-500' : ''">
                {{ isToday(date) ? 'Today' : formatDate(date) }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea class="h-72 w-100%">
                <div v-for="event in events" :key="event.id" class="mb-4">
                <div class="flex items-center">
                  <Avatar class="h-9 w-9">
                    <AvatarImage src="" alt="Avatar" />
                    <AvatarFallback>{{ event.extendedProperties?.private?.student_id?.slice(0, 2).toUpperCase() || "N/A" }}</AvatarFallback>
                  </Avatar>
                  <div class="ml-4 space-y-1">
                    <p class="text-sm font-medium leading-none">{{ event.extendedProperties?.private?.student_id || "N/A" }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium leading-none">{{ formatTime(event.start?.dateTime) }}</p>
                  <p class="text-sm text-muted-foreground">phone number</p>
                </div>
                <Separator class="my-2" />
              </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <div v-if="!isLoading && !Object.keys(groupedEvents).length">
        <p>No upcoming lessons</p>
      </div>
    <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </CardContent>
</template>




