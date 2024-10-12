<script setup lang="ts">
import { ref } from 'vue'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const isLoading = ref(false)
async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
          <Input
            id="password"
            placeholder="Password"
            type="password"
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <!-- <Button :disabled="isLoading">
          <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Sign In
        </Button> -->
        I am a
        <p></p>
      </div>

      <div class="flex flex-col md:flex-row gap-4"> 
      <NuxtLink to="/Instructor/homePage" class="w-full md:w-1/2">
        <Button variant="outline" type="button" :disabled="isLoading" class="w-full">
          Instructor
        </Button>
      </NuxtLink>

      <NuxtLink to="/Student/homePage" class="w-full md:w-1/2">
        <Button variant="outline" type="button" :disabled="isLoading" class="w-full">
          Student
        </Button>
      </NuxtLink>
    </div>

    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <!-- <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or sign up
        </span>
      </div> -->
    </div>
    <p>Not a member? Sign up <NuxtLink to="/Login/Signup" class="nav-link" style="text-decoration: underline; color: blue">here!</NuxtLink></p>

    

    
  </div>
</template>