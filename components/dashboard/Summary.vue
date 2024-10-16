<script setup lang="ts">
    import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
</script>

<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader
                class="flex flex-row items-center justify-between space-y-0 pb-2"
              >
                <CardTitle class="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path
                    d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                  />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">$1234.23</div>
                <p class="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                class="flex flex-row items-center justify-between space-y-0 pb-2"
              >
                <CardTitle class="text-sm font-medium">
                  Students (All Time)
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">45</div>
                <p class="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                class="flex flex-row items-center justify-between space-y-0 pb-2"
              >
                <CardTitle class="text-sm font-medium">
                  Current Bookings
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">35</div>
                <p class="text-xs text-muted-foreground">+10 since last hour</p>
              </CardContent>
            </Card>
          </div>
</template>