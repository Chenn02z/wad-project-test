<script setup lang="ts">
const client = useSupabaseClient();

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


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
      <CardTitle>Test Route Completion</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div class="grid grid-cols-2 gap-6">
        <div class="col-span-1 gap-2">
          <Label for="lname">Last Name</Label>
          <Input id="lname" type="text" placeholder="" />
        </div>
        <div class="col-span-1 gap-2">
          <Label for="fname">First Name</Label>
          <Input id="fname" type="text" placeholder="" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div class="gap-2">
          <Label for="email" class="col-span-2">Email</Label>
          <Input id="email" type="email" placeholder="instructor email" />
        </div>
        <div class="gap-2">
          <Label for="number" class="col-span-2">Phone Number</Label>
          <Input id="phonenumber" type="number" placeholder="instructor phone number" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <div class="gap-2">
          <Label for="dob" class="col-span-2">Date of Birth</Label>
          <Input id="dob" type="text" placeholder="instructor DOB" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>