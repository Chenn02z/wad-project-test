<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import { Skeleton } from "@/components/ui/skeleton";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Interface to define the structure of an event
interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  extendedProperties?: {
    private?: {
      location_detail?: string; // Location is stored here
      instructor_id?: string;
      student_id?: string;
    };
  };
}

// Interface for the fetch response
interface FetchResponse {
  success: boolean;
  data?: CalendarEvent[];
  message?: string;
}

interface Student {
  id: number;
  name: string;
  location: string;
  time: string;
  date: string;
  contact: string;
  upcomingLessonTopic: string;
}

interface StudentDrivingProgress {
  id: number;
  sn: number;
  module: string;
  done: boolean;
}

export default defineComponent({
  setup() {
    const events = ref<CalendarEvent[]>([]);
    const errorMessage = ref("");
    const students = ref<Student[]>([]);
    const studentProgress = ref<StudentDrivingProgress[]>([]);
    const loading = ref(true); // Loading state

    // Fetch events from the API
    const getEvents = async () => {
      try {
        const response = await $fetch<FetchResponse>("/api/getEventsBefore"); // Adjust the API path if needed
        if (response.success && response.data) {
          events.value = response.data; // Handle the events returned from the API
        } else {
          errorMessage.value = response.message || "Failed to retrieve events";
        }
      } catch (error) {
        errorMessage.value =
          "API call failed: " +
          (error instanceof Error ? error.message : String(error));
      }
    };

    const client = useSupabaseClient();

    const getStudents = async () => {
      try {
        const { data, error } = await client.from("studentview").select(); // Adjust 'studentview' to your table name
        if (error) throw error;
        if (data) {
          students.value = data; // Store the student data
          console.log("Fetched students:", data);
        }
      } catch (error) {
        console.error("Error fetching student data:", (error as Error).message);
        errorMessage.value = "Failed to retrieve student data.";
      }
    };

    function getStudentName(studentId: number): string {
      const student = students.value.find(
        (student) => student.id === studentId
      );
      return student ? student.name : "Unknown Student"; // Return name or placeholder
    }

    const getProgress = async () => {
      try {
        const { data, error } = await client
          .from("student_driving_progress")
          .select();
        if (error) throw error;
        if (data) {
          studentProgress.value = data;
          console.log("Fetched student progress:", data);
        }
      } catch (error) {
        console.error("Error fetching student progress:", (error as Error).message);
        errorMessage.value = "Failed to retrieve student progress.";
      }
    };

    function getProgressByStudent(studentId: number) {
      return studentProgress.value.filter(
        (progress) => progress.id === studentId
      );
    }

    // Trigger getEvents when the component is mounted
    onMounted(async () => {
      loading.value = true;
      await Promise.all([getEvents(), getStudents(), getProgress()]);
      loading.value = false; // Set loading to false once data is fetched
    });

    return {
      events, // The events list
      errorMessage, // Error message if any
      getEvents, // Fetch events function
      getStudentName,
      loading,
    };
  },
});
</script>

<template>
  <Card class="col-span-3">
    <CardHeader>
      <CardTitle>Review</CardTitle>
      <CardDescription>
        Please complete the following reviews for students!
      </CardDescription>
    </CardHeader>
    <CardContent>
      <!-- Loading indicator -->
      <div v-if="loading" class="flex items-center space-x-4">
        <Skeleton class="h-9 w-9 rounded-full" />
        <div class="flex flex-col space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>

      <!-- If events exist, show them -->
      <div v-else-if="events.length" class="space-y-3">
        <div
          v-for="event in events"
          :key="event.id"
          class="flex items-center gap-4"
        >
          <Avatar class="h-9 w-9">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div class="ml-4 space-y-1">
            <p class="text-sm font-medium leading-none">
              {{
                getStudentName(
                  Number(event.extendedProperties?.private?.student_id)
                )
              }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ event.extendedProperties?.private?.student_id }}
            </p>
          </div>

          <div class="ml-auto font-medium">
            <Dialog>
              <DialogTrigger as-child>
                <Button variant="outline"> Review </Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Review</DialogTitle>
                  <DialogDescription>
                    Update student's progress here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit"> Save changes </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <!-- No events message -->
      <div v-else>No events to review.</div>
    </CardContent>
  </Card>
</template>
