<template>
    <div class="container mx-auto p-4">
        <div class="space-y-0.5 mb-6">
            <h2 class="text-2xl font-bold tracking-tight">Student Dashboard</h2>
            <p class="text-muted-foreground">Your learning journey at a glance</p>
        </div>

        <div class="flex-col md:flex">
            <div class="flex-1 space-y-4 pt-6">
                <Tabs default-value="overview" class="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="upcoming-lessons">
                            Upcoming Lessons
                            <Badge variant="destructive" class="ml-2 rounded-full px-2 py-1">{{ lessons.length }}
                            </Badge>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" class="space-y-4">
                        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle class="text-sm font-medium">Total Lessons</CardTitle>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" class="h-4 w-4 text-muted-foreground">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div class="text-2xl font-bold">{{ lessons.length }}</div>
                                    <p class="text-xs text-muted-foreground">+2 from last week</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle class="text-sm font-medium">Hours Learned</CardTitle>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" class="h-4 w-4 text-muted-foreground">
                                        <rect width="20" height="14" x="2" y="5" rx="2" />
                                        <path d="M2 10h20" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div class="text-2xl font-bold">{{ lessons.length }}</div>
                                    <p class="text-xs text-muted-foreground">+1 from last week</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle class="text-sm font-medium">Next Lesson</CardTitle>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" class="h-4 w-4 text-muted-foreground">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div class="text-2xl font-bold">{{ formatDate(lessons[0].date) }}</div>
                                    <p class="text-xs text-muted-foreground">{{ lessons[0].time }}</p>
                                </CardContent>
                            </Card>
                        </div>
                        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card class="col-span-4">
                                <CardHeader>
                                    <CardTitle>Learning Progress</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <!-- Placeholder for a progress chart -->
                                    <div class="h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
                                        Progress Chart Placeholder
                                    </div>
                                </CardContent>
                            </Card>
                            <Card class="col-span-3">
                                <CardHeader>
                                    <CardTitle>Recent Lessons</CardTitle>
                                    <CardDescription>
                                        You've completed {{ lessons.length }} lessons.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div class="space-y-8">
                                        <div v-for="lesson in lessons.slice(0, 5)" :key="lesson.id"
                                            class="flex items-center">
                                            <Avatar :class="'h-9 w-9'">
                                                <AvatarImage
                                                    :src="`https://avatar.vercel.sh/${lesson.instructor.replace(' ', '-')}.png`"
                                                    alt="Avatar" />
                                                <AvatarFallback>{{ lesson.instructor.split(' ').map(n => n[0]).join('')
                                                    }}</AvatarFallback>
                                            </Avatar>
                                            <div class="ml-4 space-y-1">
                                                <p class="text-sm font-medium leading-none">{{ lesson.instructor }}</p>
                                                <p class="text-sm text-muted-foreground">
                                                    {{ formatDate(lesson.date) }} at {{ lesson.time }}
                                                </p>
                                            </div>
                                            <div class="ml-auto font-medium">{{ lesson.location }}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="upcoming-lessons" class="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Lessons</CardTitle>
                                <CardDescription>
                                    Your scheduled lessons for the next few weeks
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div class="space-y-8">
                                    <div v-for="lesson in lessons" :key="lesson.id" class="flex items-center">
                                        <Avatar :class="'h-9 w-9'">
                                            <AvatarImage
                                                :src="`https://avatar.vercel.sh/${lesson.instructor.replace(' ', '-')}.png`"
                                                alt="Avatar" />
                                            <AvatarFallback>{{ lesson.instructor.split(' ').map(n => n[0]).join('') }}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div class="ml-4 space-y-1">
                                            <p class="text-sm font-medium leading-none">{{ lesson.instructor }}</p>
                                            <p class="text-sm text-muted-foreground">
                                                {{ formatDate(lesson.date) }} at {{ lesson.time }}
                                            </p>
                                        </div>
                                        <div class="ml-auto font-medium">{{ lesson.location }}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs> <!-- Add the missing end tag here -->
            </div>
        </div>
    </div>
</template>


<script setup>
definePageMeta({
    layout: 'studentview'
});
import { ref, computed } from 'vue'

const lessons = ref([
    { id: 1, instructor: "Lee Yi Kang", date: "2024-10-10", time: "10:00 AM", duration: "1 hour", location: "Ang Mo Kio" },
    { id: 2, instructor: "Sarah Johnson", date: "2024-10-12", time: "2:00 PM", duration: "1 hour", location: "Bishan" },
    { id: 3, instructor: "Michael Tan", date: "2024-10-15", time: "11:00 AM", duration: "1 hour", location: "Tampines" },
    { id: 4, instructor: "Emily Wong", date: "2024-10-17", time: "1:00 PM", duration: "1 hour", location: "Jurong" },
    { id: 5, instructor: "David Lim", date: "2024-10-20", time: "9:00 AM", duration: "1 hour", location: "Woodlands" },
    { id: 6, instructor: "Lisa Chen", date: "2024-10-22", time: "3:00 PM", duration: "1 hour", location: "Sengkang" },
])

const currentPage = ref(1)
const lessonsPerPage = 2

const totalPages = computed(() => Math.ceil(lessons.value.length / lessonsPerPage))

const visibleLessons = computed(() => {
    const start = (currentPage.value - 1) * lessonsPerPage
    const end = start + lessonsPerPage
    return lessons.value.slice(start, end)
})

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
}
</script>

<style scoped>
.lesson-list-move,
.lesson-list-enter-active,
.lesson-list-leave-active {
    transition: all 0.5s ease;
}

.lesson-list-enter-from,
.lesson-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.lesson-list-leave-active {
    position: absolute;
}
</style>