<template>
    <div class="container mx-auto p-4">
        <div class="space-y-0.5 mb-6">
            <h2 class="text-2xl font-bold tracking-tight">Student Dashboard</h2>
            <p class="text-muted-foreground">Your learning journey at a glance</p>
        </div>

        <div class="flex-col md:flex">
            <div class="flex-1 space-y-4 pt-6">
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <!-- Total Lessons Completed Card -->
                    <Card>
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Total Lessons Completed</CardTitle>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                class="h-4 w-4 text-muted-foreground">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">{{ completedLessons.length }}</div>
                            <p class="text-xs text-muted-foreground">+{{ lessonsThisWeek.length }} from last week</p>
                        </CardContent>
                    </Card>

                    <!-- Next Lesson Card -->
                    <Card>
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Next Lesson</CardTitle>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                class="h-4 w-4 text-muted-foreground">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">
                                {{ nextLesson && nextLesson.date ? formatDate(nextLesson.date) : 'No upcoming lessons'
                                }}
                            </div>
                            <p class="text-xs text-muted-foreground">{{ nextLesson ? nextLesson.time : '' }}</p>
                        </CardContent>
                    </Card>
                </div>

                <!-- Lessons for Next Week Section -->
                <Card>
                    <CardHeader>
                        <CardTitle>Lessons for Next Week</CardTitle>
                        <CardDescription>Your scheduled lessons for the upcoming week</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="space-y-8">
                            <div v-for="lesson in nextWeekLessons" class="flex items-center">
                                <Avatar :class="'h-9 w-9'">
                                    <AvatarImage
                                        :src="`https://avatar.vercel.sh/${lesson.instructor_name.replace(' ', '-')}.png`"
                                        alt="Avatar" />
                                    <AvatarFallback>{{ lesson.instructor_name.split(' ').map(n => n[0]).join('') }}
                                    </AvatarFallback>
                                </Avatar>
                                <div class="ml-4 space-y-1">
                                    <p class="text-sm font-medium leading-none">{{ lesson.instructor_name}}</p>
                                    <p class="text-sm text-muted-foreground">{{ formatDate(lesson.date) }} at {{
                                        lesson.time }}</p>
                                </div>
                                <div class="ml-auto font-medium">{{ lesson.location }}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
definePageMeta({
    layout: 'studentview'
});
import { ref, computed } from 'vue';

// Sample data for lessons
import { onMounted } from 'vue';

// Define the Lesson interface to represent the structure of a lesson
const client = useSupabaseClient()

interface Lesson {
    instructor_id: number;
    student_id: number;
    instructor_name: string;
    date: string;
    time: string;
    location: string;
}

// Create a reactive reference to store the list of lessons
const lessons = ref<Lesson[]>([]);
// Fetch lessons from the Supabase database when the component is mounted
// Fetch lessons for student with student_id = 1 from the Supabase database when the component is mounted
onMounted(async () => {
    const { data, error } = await client
        .from('lessons')
        .select()
        .eq('student_id', 101);  // Only fetch lessons where student_id is 1
    if (error) {
        console.error('Error fetching lessons:', error); // Log any errors
    } else {
        lessons.value = data ?? []; // Assign the fetched data to the lessons reference
    }
});



// Today's date for reference
const today = new Date();

// Filtering lessons that are completed (before today)
const completedLessons = computed(() => {
    return lessons.value.filter(lesson => new Date(lesson.date) < today);
});

// Filtering lessons completed this week
const lessonsThisWeek = computed(() => {
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return completedLessons.value.filter(lesson => new Date(lesson.date) >= lastWeek && new Date(lesson.date) < today);
});

// Finding the next upcoming lesson
const nextLesson = computed(() => {
    if (lessons.value.length === 0) return null; // Return null if no lessons are available

    const now = new Date(); // Current date and time

    // Filter and sort lessons that are after the current time
    const upcomingLessons = lessons.value
        .filter(lesson => new Date(lesson.date + 'T' + lesson.time) > now) // Compare both date and time
        .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time)); // Sort by date and time

    // Return the first lesson in the sorted upcoming lessons
    return upcomingLessons.length > 0 ? upcomingLessons[0] : null;
});

// Filtering lessons for next week (within 7 days from today)
// Filtering lessons for next week (within 7 days from today) and sorting by time
const nextWeekLessons = computed(() => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Reset time to 00:00:00 today
    const nextWeek = new Date(todayStart.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    return lessons.value
        .filter(lesson => {
            const lessonDate = new Date(lesson.date);
            return lessonDate >= todayStart && lessonDate < nextWeek;
        })
        .sort((a, b) => {
            const aDateTime = new Date(`${a.date}T${a.time}`);
            const bDateTime = new Date(`${b.date}T${b.time}`);
            return aDateTime - bDateTime; // Sort by date and then by time
        }); // Sort by date and time
});



// Date formatter for display
const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>
