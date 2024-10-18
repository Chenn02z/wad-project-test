<script setup lang="ts">
definePageMeta({
  layout: "instructorview",
});
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { ref, onMounted } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface Student {
  id: number;
  name: string;
  location: string;
  time: string;
  date: string;
  upcomingLessonTopic: string; 
}

const studentview = ref<Student[]>([]);
onMounted(async () => {
  const { data } = await client.from('studentview').select();
  studentview.value = data ?? [];
});

// Function stubs for rescheduling and canceling lessons
const rescheduleLesson = (studentId: number) => {
  console.log(`Rescheduling lesson for student ID: ${studentId}`);
};

const cancelLesson = (studentId: number) => {
  console.log(`Canceling lesson for student ID: ${studentId}`);
};
</script>

<template>
  <div class="space-y-0.5">
    <h2 class="text-2xl font-bold tracking-tight">Current Students</h2>
    <p class="text-muted-foreground">See your students!</p>
  </div>

  <ScrollArea class="w-full max-w-6xl whitespace-nowrap">
    <div class="flex p-4 space-x-4 w-max">
      <div
        v-for="student in studentview"
        :key="student.id"
        class="student-card"
      >
        <figure class="shrink-0">
          <div class="overflow-hidden rounded-md">
            <Card>
              <CardContent>
                <img class="rounded-md"
                  src="https://via.placeholder.com/150"
                  alt="Student Photo"
                />
                <h2 class="text-xl font-semibold">{{ student.name }}</h2>
                <p class="mt-2">Date: {{ student.date }}</p>
                <p>Time: {{ student.time }}</p>
                <p>Location: {{ student.location }}</p>
                <p>Contact: {{ student.contact }}</p>
                <p>Upcoming Lesson: {{ student.upcomingLessonTopic }}</p>
              </CardContent>
              <div class="mt-4 flex justify-between px-4 pb-4">
              <Dialog>
              <DialogTrigger as-child>
                <button
                  class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  @click="rescheduleLesson(student.id)"
                >
                  Reschedule
                </button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Reschedule Lesson</DialogTitle>
                  <DialogDescription>
                    Current lesson: {{student.date}}, {{student.time}}, {{student.location}}
                  </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="time" class="text-right">
                      Time of rescheduled class
                    </Label>
                    <Input id="time" class="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
              </Dialog>
              <Dialog>
              <DialogTrigger as-child>
                <button
                  class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  @click="cancelLesson(student.id)"
                >
                  Cancel
                </button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Reschedule Lesson</DialogTitle>
                  <DialogDescription>
                    Current lesson: {{student.date}}, {{student.time}}, {{student.location}}
                  </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="time" class="text-right">
                      Time of rescheduled class
                    </Label>
                    <Input id="time" class="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
              </Dialog>
              </div>
            </Card>
          </div>
        </figure>
      </div>
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</template>

<style scoped>
.student-card {
  width: 220px; /* Default width */
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.student-card:hover {
  transform: scale(1.1); /* Slightly increase size on hover */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  z-index: 10; /* Make sure the card appears above others when hovered */
}
</style>
