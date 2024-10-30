<script setup lang="ts">
import { BarChart } from "@/components/ui/chart-bar";

// const data = [
//   { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
// ];

const client = useSupabaseClient();

interface Earning {
  month: string;
  instructorId: number;
  year: number;
  amount: number;
}

const { data: instructor_earnings } = await useAsyncData<Earning[]>(
  "instructor_earnings",
  async () => {
    const { data } = await client.from("instructor_earnings").select();
    return data ?? [];
  }
);

function getInstructorEarning(instructorId: number){
  return (
    instructor_earnings.value?.filter(
      (earning) => earning.instructorId === instructorId
    )
  );
}

const instructorId = 101; // replace with session id

const formattedEarnings = computed(() => {
  return (
    instructor_earnings.value
      ?.filter((earning) => earning.instructorId === instructorId)
      .map((earning) => ({
        name: earning.month,
        total: earning.amount, 
      })) ?? []
  );
});


</script>

<template>
    <CardHeader>
      <CardTitle class="">Overview</CardTitle>
    </CardHeader>
    <CardContent class="pl-2">
      <BarChart
        :data="formattedEarnings"
        :categories="['total']"
        :index="'name'"
        :rounded-corners="4"
      />
    </CardContent>
</template>
