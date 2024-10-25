<template>
  <div class="space-y-0.5">
    <h2 class="text-2xl font-bold tracking-tight">Home</h2>
    <p class="text-muted-foreground">Manage everything here!</p>
  </div>
  <div class="hidden flex-col md:flex">
    <div class="flex-1 space-y-4 pt-6">
      <Tabs default-value="overview" class="space-y-4">
        <TabsList>
          <TabsTrigger value="overview"> Overview </TabsTrigger>
          <TabsTrigger value="calendar"> Calendar </TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
            <Badge variant="destructive" class="rounded-full px-2 py-1">
              3
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" class="space-y-4">
          <Summary />
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <Overview />
            </Card>
            <RecentSales />
          </div>
        </TabsContent>

        <TabsContent value="calendar" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card class="col-span-3">
              <Cal />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Notifications />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>

</template>

<script setup lang="ts">

definePageMeta({
  layout: "instructorview",
});

import Overview from "@/components/dashboard/Overview.vue";
import RecentSales from "@/components/dashboard/RecentSales.vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Notifications from "@/components/dashboard/Notifications.vue";
import Summary from "@/components/dashboard/Summary.vue";
import { Badge } from "@/components/ui/badge";
import Cal from "@/components/dashboard/Cal.vue";

definePageMeta({
  layout: 'instructorview'
})

import { ref } from "vue";
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
const events = ref<CalendarEvent[]>([]); // Properly type events as CalendarEvent[]
const isLoading = ref(false); // Loading state
const startDate = ref(new Date().toISOString().split("T")[0]); // Default to today's date
const instructorId = ref("");

// Fetch events function
const getEvents = async () => {
  isLoading.value = true;

  try {
    // Format timeMin as ISO string from startDate
    const timeMin = new Date(startDate.value).toISOString();

    const { data } = await useFetch<{
      success: boolean;
      data?: CalendarEvent[];
    }>("/api/getEvent", {
      params: {
        timeMin,
        instructorId: instructorId.value || undefined, // Optional parameter
      },
    });

    if (data.value?.success && data.value?.data) {
      events.value = data.value.data;
    } else {
      events.value = []; // Clear events if no data is found
    }
  } catch (error) {
    // Handle errors if necessary (for now, we just clear events)
    events.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Helper functions for date and time formatting
const formatDate = (dateTime: string | undefined): string => {
  if (!dateTime) return "N/A";
  const date = new Date(dateTime);
  return date.toLocaleDateString();
};

const formatTime = (dateTime: string | undefined): string => {
  if (!dateTime) return "All day";
  const date = new Date(dateTime);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};
</script>

