<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

</script>

<template>
  <Card>
    <CardHeader class="pb-3">
      <CardTitle>Notifications</CardTitle>
      <CardDescription>
        Choose what you want to be notified about.
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-1">
      <div class="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
        <BellIcon class="mt-px h-5 w-5" />
        <div class="space-y-1">
          <p class="text-sm font-medium leading-none">
            Everything
          </p>
          <p class="text-sm text-muted-foreground">
            New bookings, notification reviews & all activity.
          </p>
        </div>
      </div>
      <div class="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
        <EyeNoneIcon class="mt-px h-5 w-5" />
        <div class="space-y-1">
          <p class="text-sm font-medium leading-none">
            Ignoring
          </p>
          <p class="text-sm text-muted-foreground">
            Turn off all notifications.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>