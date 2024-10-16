<script setup lang="ts">
definePageMeta({
  layout: "instructorview",
});
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { CurrentStudents } from "@/data/students";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const students = CurrentStudents;
</script>

<template>

  <div class="space-y-0.5">
    <h2 class="text-2xl font-bold tracking-tight">Current Students</h2>
    <p class="text-muted-foreground">See your students!</p>
  </div>

  <ScrollArea class="w-full max-w-6xl whitespace-nowrap">
    <div class="flex p-4 space-x-4 w-max">
      <div v-for="student in students" :key="student.name">
        <figure class="shrink-0">
          <div class="overflow-hidden rounded-md">
            <Card>
              <CardContent>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Student Photo"
                />
                <h2 class="text-xl font-semibold">{{ student.name }}</h2>
                <p class="mt-2">Date: {{ student.date }}</p>
                <p>Time: {{ student.time }}</p>
                <p>Location: {{ student.location }}</p>
              </CardContent>
            </Card>
          </div>
        </figure>
      </div>
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</template>
