<script setup lang="ts">

definePageMeta({
  layout: "studentview",
});
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ref } from 'vue';
type Checked = DropdownMenuCheckboxItemProps['checked']

const showNewest = ref<Checked>(true)
const showHighest = ref<Checked>(false)
const showLowest = ref<Checked>(false)

import Stars from '@/components/review/Stars.vue';

const reviews = [
  {
    name: "John Tan",
    rating: 4,
    comment: "Great instructor!",
    date_posted: "3 days ago",
    badges: ["Just passed BTT"]
  },
  {
    name: "Sarah Lim",
    rating: 5,
    comment: "Very thorough and clear.",
    date_posted: "2 weeks ago",
    badges: ["Parallel Parking Princess"]
  },
  {
    name: "Alex Wong",
    rating: 3,
    comment: "Decent experience but could improve.",
    date_posted: "1 month ago",
    badges: ["Failed 3 times..."]
  }
]
</script>

<template>
  <div class="flex flex-col">
    <NuxtLink to="instructorReview" class="inline-flex">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2 mt-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg> 
      <h1 class="text-lg">Back to Reviews</h1>
    </NuxtLink>
    <br>
    <div class="inline-flex"><h1 class="text-3xl font-bold tracking-tight">Instructor Uncle's Reviews</h1>
    <div class="ml-auto flex-end">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline">
            Sort reviews
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuCheckboxItem v-model:checked="showNewest">
            Newest
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem v-model:checked="showHighest" disabled>
            Highest
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem v-model:checked="showLowest">
            Lowest
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

    <br>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-3" style="height:300px">
    <Card id="app" class="review" v-for="(review, idx) in reviews" :key="idx">
        <!-- Name and rating in the center -->
        <div class="flex-grow inline-flex items-center mb-2">
          <div class="text-2xl font-bold">{{review.name}}</div>
          <div class="flex ml-4">
            <Stars :rating="review.rating" />
          </div>
        </div>
        <div>
          <div class="text-sm mb-2" style="color:gray">
          {{ review.date_posted }}
          </div>
        <div class="text-sm mb-2" style="font-style: italic" v-for="badge in review.badges">
            {{ badge }}
        </div>
        </div>
        <hr>
        <p class="py-2">{{review.comment}}</p>


    </Card>
  </div>
  </div>  
</template>

<style>
.review {
  padding: 1rem;
}
</style>