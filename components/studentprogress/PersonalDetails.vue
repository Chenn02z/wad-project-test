<script setup lang="ts">
const client = useSupabaseClient();

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Student {
  id: number;
  name: string;
  location: string;
  time: string;
  date: string;
  contact: string;
  upcomingLessonTopic: string;
}

const { data: studentview } = await useAsyncData<Student[]>(
  "studentview",
  async () => {
    const { data } = await client.from("studentview").select();
    return data ?? [];
  }
);
</script>

<template>
  <Card class="h-64 overflow-hidden">
    <CardHeader class="pb-3 h-16">
      <CardTitle>Personal Details</CardTitle>
    </CardHeader>
    <CardContent class="flex items-center justify-between space-x-4">
        <div>
            <p>Phone Number:</p>
        </div>
        <div>
            {{ student.contact }}
        </div>
    </CardContent>
  </Card>
</template>