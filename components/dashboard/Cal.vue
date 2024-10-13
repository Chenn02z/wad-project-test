<script setup lang="ts">
import { Calendar } from "@/components/ui/v-calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const calData = [
  {
    name: "Olivia Martin",
    phone: "91234567",
    fallback: "OM",
    time: "10:00AM",
    Location: "Ang Mo Kio",
  },
  {
    name: "Jackson Lee",
    phone: "98765432",
    fallback: "JL",
    time: "11:30AM",
    Location: "Bishan",
  },
  {
    name: "Isabella Nguyen",
    phone: "97654321",
    fallback: "IN",
    time: "9:00AM",
    Location: "Clementi",
  },
  {
    name: "William Kim",
    phone: "91239876",
    fallback: "WK",
    time: "1:00PM",
    Location: "Jurong East",
  },
  {
    name: "Sofia Davis",
    phone: "92345678",
    fallback: "SD",
    time: "3:45PM",
    Location: "Toa Payoh",
  },
  {
    name: "Mia Lee",
    phone: "96543210",
    fallback: "ML",
    time: "2:15PM",
    Location: "Sengkang",
  },
];
</script>

<template>
  <CardHeader>
    <CardTitle>Calendar</CardTitle>
  </CardHeader>
  <CardContent class="pl-2">
    <Calendar view="weekly" />
    <ScrollArea class="h-60 mt-5">
      <div v-for="(cal, index) in calData" :key="index" class="flex items-center my-3">
        <Avatar class="h-9 w-9">
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback>{{ cal.fallback }}</AvatarFallback>
        </Avatar>
        <div class="ml-4 space-y-1">
          <p class="text-sm font-medium leading-none">{{ cal.name }}</p>
          <p class="text-sm text-muted-foreground">{{ cal.phone }}</p>
        </div>
        <div class="ml-auto font-medium">{{ cal.time }}</div>
      </div>
    </ScrollArea>
  </CardContent>
</template>
