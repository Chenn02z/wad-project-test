<script setup lang="ts">
definePageMeta({
  layout: "instructorview",
});

import { CurrentStudents } from '@/data/students';

const students = CurrentStudents;
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
            <Card class="h-full overflow-hidden">
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
                <!-- Reschedule Dialog -->
                <Dialog>
                  <DialogTrigger as-child>
                    <button
                      class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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
                        <label for="time" class="text-right">
                          Time of rescheduled class
                        </label>
                        <input id="time" type="text" class="col-span-3 input" />
                      </div>
                    </div>
                    <DialogFooter>
                      <button class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Save changes</button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <!-- Cancel Dialog -->
                <Dialog>
                  <DialogTrigger as-child>
                    <button
                      class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Cancel Lesson</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to cancel the lesson scheduled for {{student.date}}?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <button class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Yes, Cancel</button>
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
  width: 220px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  overflow: hidden;
}

.student-card:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.dialog {
  overflow: visible;
}
</style>
