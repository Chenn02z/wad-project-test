<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
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

// Interface definitions
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
      location_detail?: string;
      instructor_id?: string;
      student_id?: string;
    };
  };
}

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
  modulesn: string;
}

export default defineComponent({
  setup() {
    const events = ref<CalendarEvent[]>([]);
    const errorMessage = ref("");
    const students = ref<Student[]>([]);
    const studentProgress = ref<StudentDrivingProgress[]>([]);
    const loading = ref(true);
    const dialogOpen = ref(false);
    const client = useSupabaseClient();

    const getEvents = async () => {
      try {
        const response = await $fetch<FetchResponse>("/api/getEventsBefore");
        if (response.success && response.data) events.value = response.data;
        else errorMessage.value = response.message || "Failed to retrieve events";
      } catch (error) {
        errorMessage.value = "API call failed: " + (error as Error).message;
      }
    };

    const getStudents = async () => {
      try {
        const { data, error } = await client.from("studentview").select();
        if (error) throw error;
        if (data) students.value = data;
      } catch (error) {
        errorMessage.value = "Failed to retrieve student data.";
      }
    };

    function getStudentName(studentId: number): string {
      const student = students.value.find((student) => student.id === studentId);
      return student ? student.name : "Unknown Student";
    }

    const getProgress = async () => {
      try {
        const { data, error } = await client.from("student_driving_progress").select();
        if (error) throw error;
        if (data) studentProgress.value = data;
      } catch (error) {
        errorMessage.value = "Failed to retrieve student progress.";
      }
    };

    function getProgressByStudent(studentId: number) {
      return studentProgress.value.filter(
        (progress) => progress.id === studentId && progress.done === false
      );
    }

    const updateProgress = async () => {
      try {
        const updatedProgressItems = studentProgress.value.filter((progress) => progress.done !== false);

        for (const progress of updatedProgressItems) {
          const { error } = await client
            .from("student_driving_progress")
            .update({ done: progress.done })
            .eq("modulesn", progress.modulesn);

          if (error) throw error;
        }
        console.log("Progress updated successfully.");
      } catch (error) {
        errorMessage.value = "Failed to save progress.";
      }
    };

    const handleSubmit = async () => {
      try {
        await updateProgress();
        dialogOpen.value = false; // Close dialog after successful submission
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        errorMessage.value = "Submission failed.";
      }
    };

    onMounted(async () => {
      loading.value = true;
      await Promise.all([getEvents(), getStudents(), getProgress()]);
      loading.value = false;
    });

    return {
      events,
      errorMessage,
      getStudentName,
      getProgressByStudent,
      handleSubmit,
      dialogOpen,
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
      <div v-if="loading" class="flex items-center space-x-4">
        <Skeleton class="h-9 w-9 rounded-full" />
        <div class="flex flex-col space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>

      <div v-else-if="events.length" class="space-y-3">
        <div v-for="event in events" :key="event.id" class="flex items-center gap-4">
          <Avatar class="h-9 w-9">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div class="ml-4 space-y-1">
            <p class="text-sm font-medium leading-none">
              {{ getStudentName(Number(event.extendedProperties?.private?.student_id)) }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ event.start.date ? event.start.date : (event.start.dateTime ? new Date(event.start.dateTime).toLocaleDateString() : 'No Date') }}
            </p>
          </div>

          <div class="ml-auto font-medium">
            <Dialog v-model="dialogOpen">
              <DialogTrigger as-child>
                <Button variant="outline" @click="dialogOpen = true"> Review </Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <form @submit.prevent="handleSubmit">
                  <DialogHeader>
                    <DialogTitle>Review</DialogTitle>
                    <DialogDescription>
                      <div
                        v-for="progress in getProgressByStudent(
                          Number(event.extendedProperties?.private?.student_id)
                        )"
                        :key="progress.modulesn"
                      >
                        <div class="flex items-center space-x-2 space-y-1">
                          <Checkbox :id="progress.modulesn" v-model="progress.done" />
                          <label
                            :for="progress.modulesn"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {{ progress.module }}
                          </label>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button type="submit"> Save changes </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div v-else>No events to review.</div>
    </CardContent>
  </Card>
</template>


