<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Review from '@/components/dashboard/Review.vue';

</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center">
      <Avatar class="h-9 w-9">
        <AvatarImage src="" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">Olivia Martin</p>
        <p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
      </div>

      <div class="ml-auto font-medium">
        <Review />
      </div>
    </div>
    <div class="flex items-center">
      <Avatar class="h-9 w-9">
        <AvatarImage src="" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">Olivia Martin</p>
        <p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
      </div>

      <div class="ml-auto font-medium">
        <Review />
      </div>
    </div>
    <div class="flex items-center">
      <Avatar class="h-9 w-9">
        <AvatarImage src="" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">Olivia Martin</p>
        <p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
      </div>

      <div class="ml-auto font-medium">
        <Review />
      </div>
    </div>
    <div class="flex items-center">
      <Avatar class="h-9 w-9">
        <AvatarImage src="" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">Olivia Martin</p>
        <p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
      </div>

      <div class="ml-auto font-medium">
        <Review />
      </div>
    </div>
    <div class="flex items-center">
      <Avatar class="h-9 w-9">
        <AvatarImage src="" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">Olivia Martin</p>
        <p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
      </div>

      <div class="ml-auto font-medium">
        <Review />
      </div>
    </div>
    
  </div>
</template>
