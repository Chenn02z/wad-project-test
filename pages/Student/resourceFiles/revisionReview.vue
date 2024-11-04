<script setup lang="ts">

definePageMeta({
  layout: "studentview",
});

import { useRoute } from 'vue-router';
const route = useRoute();
const currentTopic = ref<'BTT' | 'FTT'>(route.query.topic as 'BTT' | 'FTT');

const results = Array.isArray(route.query.results) 
    ? route.query.results // If it's an array, use it as is
    : JSON.parse(route.query.results || '[]'); // Parse if it's a string or default to an empty array

if (currentTopic.value === "BTT") {
  const BTTquestions = ref<BTT_questions[]>([]);
  const BTTanswers = ref<BTT_answers[]>([]);
  
  interface BTT_questions {
    qid: number;
    question: string;
    topic: string;
  }
  
  interface BTT_answers {
    aid: number;
    qid: number;
    option: string;
    is_correct: boolean;
  }

  onMounted(async () => {
    const { data: BTTquestionsData, error: BTTquestionsError } = await client
      .from('BTT_questions')
      .select('*');

    if (BTTquestionsError) {
      console.error('Error fetching BTT questions:', BTTquestionsError);
      return;
    }

    if (BTTquestionsData) {
      BTTquestions.value = BTTquestionsData;
      questions.value = BTTquestions.value; // Limit to selected questions
      feedbackMessages.value = new Array(questions.value.length).fill(''); // Initialize feedback messages
      answerCorrect.value = new Array(questions.value.length).fill(null); // Initialize correctness tracking
    }

    const { data: BTTanswersData, error: BTTanswersError } = await client
      .from('BTT_answers')
      .select('*');

    if (BTTanswersError) {
      console.error('Error fetching BTT answers:', BTTanswersError);
      return;
    }

    if (BTTanswersData) {
      BTTanswers.value = BTTanswersData;
      answers.value = BTTanswers.value; // Store all answers
    }
  });
  // Fetch correct answers from Supabase
    onMounted(async () => {
      const { data, error } = await client
        .from('BTT_questions') 
        .select('qid, aid')
        .eq('is_correct', true); // Fetch only correct answers
      
      if (data) {
        correctAnswers.value = data.map(item => ({ qid: item.qid, aid: item.aid }));
      }
    });

} else if (currentTopic.value === "FTT") {
  const FTTquestions = ref<FTT_questions[]>([]);
  const FTTanswers = ref<FTT_answers[]>([]);
  
  interface FTT_questions {
    qid: number;
    question: string;
    topic: string;
  }
  
  interface FTT_answers {
    aid: number;
    qid: number;
    option: string;
    is_correct: boolean;
  }

  onMounted(async () => {
    const { data: FTTquestionsData, error: FTTquestionsError } = await client
      .from('FTT_questions')
      .select('*');

    if (FTTquestionsError) {
      console.error('Error fetching FTT questions:', FTTquestionsError);
      return;
    }

    if (FTTquestionsData) {
      FTTquestions.value = FTTquestionsData;
      questions.value = FTTquestions.value; // Limit to selected questions
      feedbackMessages.value = new Array(questions.value.length).fill(''); // Initialize feedback messages
      answerCorrect.value = new Array(questions.value.length).fill(null); // Initialize correctness tracking
    }

    const { data: FTTanswersData, error: FTTanswersError } = await client
      .from('FTT_answers')
      .select('*');

    if (FTTanswersError) {
      console.error('Error fetching FTT answers:', FTTanswersError);
      return;
    }

    if (FTTanswersData) {
      FTTanswers.value = FTTanswersData;
      answers.value = FTTanswers.value; // Store all answers
    }
  });
  // Fetch correct answers from Supabase
  onMounted(async () => {
    const { data, error } = await client
      .from('FTT_questions')
      .select('qid, aid')
      .eq('is_correct', true); // Fetch only correct answers
    
    if (data) {
      correctAnswers.value = data.map(item => ({ qid: item.qid, aid: item.aid }));
    }
  });
}

</script>

<template>
  <div>
    <a href="/Student/resourcesPage" class="inline-flex">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2 mt-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg> 
      <h1 class="text-lg">Back to Resources</h1>
    </a>
  </div>
    
    <ul class="mt-4">
      <li v-for="result in results" :key="result.qid" class="mb-2">
        <div>
          <strong>Question ID:</strong> {{ result.qid }} 
          <strong>Your Answer ID:</strong> {{ result.selectedAid }}
        </div>
      </li>
    </ul>
    
    <div v-if="results.length === 0" class="mt-4 text-gray-500">
      No results to display.
    </div>
</template>