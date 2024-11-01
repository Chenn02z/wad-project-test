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
            <Badge
              v-if="eventCount > 0"
              variant="destructive"
              class="rounded-full px-2 py-1"
            >
              {{ eventCount }}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" class="space-y-4">
          <Summary />
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <Card>
              <Overview />
            </Card>
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
            <Notifications @updateEventCount="updateEventCount"/>
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

const eventCount = ref(0);

function updateEventCount(count: number) {
  eventCount.value = count;
}
definePageMeta({
  layout: "instructorview",
});

import { ref } from "vue";


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
const events = ref<CalendarEvent[]>([]);
const errorMessage = ref("");

interface FetchResponse {
  success: boolean;
  data?: CalendarEvent[];
  message?: string;
}

const getPastEvents = async () => {
  try {
    const response = await $fetch<FetchResponse>("/api/getEventsBefore");
    if (response.success && response.data) {
      events.value = response.data;
      eventCount.value = events.value.length; // Update eventCount with the number of past events
    } else {
      errorMessage.value = response.message || "Failed to retrieve events";
      eventCount.value = 0; // Reset count if there’s an error
    }
  } catch (error) {
    errorMessage.value = "API call failed: " + (error as Error).message;
    eventCount.value = 0; // Reset count in case of failure
  }
};


onMounted(async () => {
  await getPastEvents();
});
</script>
