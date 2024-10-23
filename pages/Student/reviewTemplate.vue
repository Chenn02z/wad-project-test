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
</script>

<template>
  <div class="flex flex-col">
  <h1 class="text-3xl font-bold tracking-tight">Instructor Uncle's Reviews</h1>
  <br>
  <span>
    <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        Sort reviews
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuCheckboxItem
        v-model:checked="showNewest"
      >
        Newest
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        v-model:checked="showHighest"
        disabled
      >
        Highest
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        v-model:checked="showLowest"
      >
        Lowest
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</span>
    <div>
      <h1 class="text-2xl font-bold tracking-tight">Review Summary</h1>
    </div>
    <Card class="card">
      <div class="flex-shrink-0 mr-16">
          <img 
            height="100px" 
            width="100px" 
            src="https://scontent.fsin14-2.fna.fbcdn.net/v/t39.30808-6/311131601_159346513392988_2524761502451219904_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Yf2seX74QjAQ7kNvgGEyEPO&_nc_zt=23&_nc_ht=scontent.fsin14-2.fna&_nc_gid=ACoU4KLZNSN1hrATqPggZVl&oh=00_AYAGmkRREWT30r0IH5zV7H4j1V9ttYA_n_dfuHrxkrEf0Q&oe=671D81C1" 
            alt="Instructor Uncle" 
            class="rounded-full"
          />
        </div>
        
        <!-- Name and rating in the center -->
        <div class="flex-grow">
          <h1 class="text-2xl font-bold mb-4">Instructor Uncle</h1>
          <div class="inline-flex items-center">
            <h2 class="text-xl">4.1</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="gold" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ml-1" style="color: gold;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
          </div>
        </div>
        
        <!-- Total reviews on the rightmost side -->
        <div class="flex-shrink-0 mr-6 text-center">
          <h2 class="text-lg"><b>Total reviews:</b><br>10</h2>
        </div>
      </Card>
    </div>
</template>

<style>
  .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    overflow: hidden;
  }

  .card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #bfc2c5;
  }
</style>