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
const client = useSupabaseClient()

interface Student {
  id: number;
  name: string;
  location: string;
  time: string;
  date: string;
}

const studentview = ref<Student[]>([]);
onMounted(async () => {
  const { data } = await client.from('studentview').select();
  studentview.value = data ?? [];
});;

</script>

<template>

  <div class="space-y-0.5">
    <h2 class="text-2xl font-bold tracking-tight">Current Students</h2>
    <p class="text-muted-foreground">See your students!</p>
  </div>

  <ScrollArea class="w-full max-w-6xl whitespace-nowrap">
    <div class="flex p-4 space-x-4 w-max">
      <div v-for="student in studentview" :key="student.id">
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
              </CardContent>
            </Card>
          </div>
        </figure>
      </div>
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</template>
