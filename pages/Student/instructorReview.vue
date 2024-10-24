<template>
    <div class="flex flex-col">
      <h1 class="text-3xl font-bold tracking-tight">Reviews</h1>
      <br>
      <NuxtLink to="reviewTemplate">
      <Card class="card" v-for="(instructor, idx) in instructorRatings" :key="idx">
        <div class="flex-shrink-0 mr-16">
          <img 
            height="100px" 
            width="100px" 
            :src="instructor.instructorImg"
            alt="Instructor Uncle" 
            class="rounded-full"
          />
        </div>
        
        <!-- Name and rating in the center -->
        <div class="flex-grow">
          <h1 class="text-2xl font-bold mb-4">{{instructor.instructor}}</h1>
          <div class="inline-flex items-center">
            <h2 class="text-xl">{{instructor.rating}}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="gold" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ml-1" style="color: gold;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
          </div>
        </div>
        
        <!-- Total reviews on the rightmost side -->
        <div class="flex p-3 text-center">
          <h2 class="text-lg"><b>Total reviews:</b><br>{{ instructor.totalReviews }}</h2>
        </div>
      </Card>
    </NuxtLink>
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
    margin-bottom: 10px
  }

  .card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #bfc2c5;
  }
</style>
<script setup lang="ts">
definePageMeta({
  layout: 'studentview'
});

import {Card, CardContent, CardDescription} from '@/components/ui/card';

const instructorRatings = [
  {
    instructor: "David Goh",
    instructorImg: "https://scontent.fsin14-2.fna.fbcdn.net/v/t39.30808-6/311131601_159346513392988_2524761502451219904_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Yf2seX74QjAQ7kNvgGEyEPO&_nc_zt=23&_nc_ht=scontent.fsin14-2.fna&_nc_gid=ACoU4KLZNSN1hrATqPggZVl&oh=00_AYAGmkRREWT30r0IH5zV7H4j1V9ttYA_n_dfuHrxkrEf0Q&oe=671D81C1",
    rating: "4.1",
    totalReviews: "32"
  },
  {
    instructor: "Lee Kong Beng",
    instructorImg: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAgQFBgcBAAj/xAA5EAACAQMBBQUGBAQHAAAAAAABAgMABBEhBRITMUEGIlFhgQcycZGx0RRCUqEjJHLBM0NTYpLh8P/EABoBAAIDAQEAAAAAAAAAAAAAAAIDAQQFBgD/xAAhEQACAgICAgMBAAAAAAAAAAAAAQIRAyEEEjFBIlFhE//aAAwDAQACEQMRAD8A2NtVpu+hpwNRQJOdEyEBNIND2heQbPtJbq7fchjXeY1knaX2h320IJYrBfwcDAqGBzIQeuenpS2GkaPtztDs3YkIe9nG+c7sSas3p09apE3tXi4+7BstjHn3mmGfkAaywTyTg8SRnkb8zHJ613grEUYLzXGCeZqQqNki7ZbN25YyQxk29zpiKQ89ehp7s44ZuZyegz4Vg8k7rJvRFgVOo8DWtezrby7WtDbzt/NQ88nVl8aCvlYd6ouKM7aImMdWOKWkbjQyYGeSrj71xXRC2XUEnlnyFd4oPuq7fBf7mjFhIYkaNGdd84By/e+tFKKTQYGl4aKIgCAB3nx9M0pTO6ht+JcjON0nHrkV4gsikUOUUpeddcZFGxaZlvtj2o8UFts+JsAjjS69M4X6GsguZyy8Je87HpWm+2uArtKzlIISaAxk/A/91SOzew5JomvbgYj13M9R40iTrbLMF20hjs+zeXTGWI0+NKvo5EBGNFGvhU1ZXey7WVeNcqGV86A1Ltsuz2qBNYzxujdQaDu7G/zTWjP1khk0cFWH5l61Mdj7xNn9orGbfzFxQrjkN1tDn5/tUhcdiJ4JiY7qHgnnvc1qL25sGXZ8loLeQSG4k4S7v6zoKPsmLcWj6ACgDCgD4UNB3PU/WupGQu60jnGBz8vKvGFANN71c/ejFC4zriuQyJwkyyjujr5UJI491SY0JwNSoo6qoGiqB5CpILCBSzyrmK6eVNYlGW+1srdTRWEpUDhBoTjUSEnXPh7o9fKoy42dJD2etbZFIYQIrAaHlrV07dbKkuBHtCGMu0C4OB7hByG+v7VB7SmCyqSQFC8j51nZbTdmpi6uKoz+J5baXhxbMs1TOG35cMP2qV2SN+YiOHgqwzjQ/Spu/msDFxZwmQOeOdE2dbKJkkIRVZe6BjOtQ5aDjHZVNsi0a6CXlrc3J90CMEgefOpHsjsizutsWssfEeCCTirDNkGORQcH0zn5VJ3Npay3G7MmHHusMj96lOz8It77KKWBQ9denjTIS2kKyLTZZv4gJO6mpz7x+1IBmYHSMakcz4/ClCYdVcY/2GkJKApysg1J/wANvH4VYRUE7swAGY9NORrsbzNGrZjGRn3T96808fMtj+oEUGO4iEaAyoO6ObCpIZca450r1Dc00SI3qy7tWCb5zGRuNnBHLSrL7QNsfgthXUNpL/MshzucwvWs6k2li1s45G3kNvHh/PdGaz82aMpdV6NLBhcY9n7GG0bxYruO3uA2ZV7h3SQfhSoVmtZ8Q3jIRpw5gVx6GpR7WLaFsFkRZVGo8vMUS1l2japwIpZWXUAuA2ARjmQa9FpoZ8hjdXXuJJerNcA5RUYZX0FW7svKzM8spwQAoP1/tUEuzoYrjiybrXU5DSzyczgY+Q8BVn2U9vbtw1mTdB0JYDPPWvRyY1OrAyRm4eCbWVC5Cup5daJmkd2ROjKfUUJYIiCeGoO8dVGDz8qtXZTFrpEn9Ir2fM/OhtEqr3WkXA6OT9aGquVB40nLwX7VJBJbV7T2toCtsPxEniDhB69fSqXtPtZfXIcGWSIfohwB+xzUVPONzLc/jTDfjkJGd1uhrnc3NzZXt6/Do8HBw4l4t/ot7w3O8HJKGM5z11qIjUCAWb+9FkRn9SZ0+1Pp48AsujD318vEVGu/eCy5DKe646fep48urv0HycfeOvJ2Ca6tGIhcqP0kVMWN/tCTBZkwTzIzUasrMnfTJHMjXNeF475trTuyEd5v9MfetFTjV2ZjhK6rZIWl3LezSSyOWHFITwwNNP8A3WnCSqhwQMimVmgtzGkYwqqQBR3XJ3qxcz7zbNfGusEiUsdpSWswaJsZ5rnAIq4WVwl5a8e2lbGuVcA7p6is4dt0I3gasfZa/ZLqW2PeWYd0ZA73P71b4GZ4pqDfxZS5+BTg5ryizFpigwI2yOeSv7a0kSOBgwSaea/eu8ZUQCQMmBqWGnz5V0MGGV7wPUVvmGZsrEoYnOWibdz4joflSAmG1ocZPE+Ka+h0oykka1yslR1qdnmLqAeq6qfCm80Ec4MiYGOY8KeLrTW6XgsGjJBqYPegZDOeNrdeZzkZA5geNOXtJxKJIZ1UdU3O6fj1z60t0T8OGCgZ5gV20YmyiJ57256Yb7Cm9m1aEuvYuAuT/ERVI00Oc04PLFBQ96jGq8vI30NZz/C9aLsy7NvdiRf8qQOfnnHyoN37g+NctQAz4/Mcn/iKZHUbAavRp8rq8LuhyCpII+FIMETatFGxPUqDTLYZ/E7JiaYZYZTI0JA8xTuXfiICyNgjOoH2rpMc+8FL7ObnDpNx+j//2Q==",
    rating: "3.5",
    totalReviews: "2"
  },
  {
    instructor: "Xavier Tan",
    instructorImg: "data:image/jpeg;base64,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",
    rating: "4.5",
    totalReviews: "12"
  },
  {
    instructor: "Alex Lim",
    instructorImg: "https://theurbanwire.sg/wp-content/uploads/2022/05/photo_2022-05-13-16.32.39.jpeg",
    rating: "1.3",
    totalReviews: "5"
  }
]

</script>