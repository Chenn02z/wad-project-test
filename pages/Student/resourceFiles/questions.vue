<script setup lang="ts">
definePageMeta({
  layout: "studentview",
});

const client = useSupabaseClient();
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { Button } from '@/components/ui/button';
const route = useRoute();

// Define reactive variables for your data
const currentTopic = ref<'BTT' | 'FTT'>(route.query.topic as 'BTT' | 'FTT');
const currentType = ref<'practise' | 'test'>(route.query.type as 'practise' | 'test');
const selectedQuestions = ref<number | null>(
  currentType.value === 'practise' && route.query.questions
    ? Number(route.query.questions)
    : null
);

const questions = ref<any[]>([]);
const answers = ref<any[]>([]);
const selectedAnswers = ref<number[]>([]); // Track selected answers for each question
const feedbackMessages = ref<string[]>([]); // Track feedback for each question
const answerCorrect = ref<boolean[]>([]); // Track if each answer is correct

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
      questions.value = BTTquestions.value.slice(0, selectedQuestions.value); // Limit to selected questions
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
      questions.value = FTTquestions.value.slice(0, selectedQuestions.value); // Limit to selected questions
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
}

// Check selected answer against correct answer
function checkAnswer(index: number, qid: number, selectedAid: number) {
  const correctAnswer = answers.value.find(answer => answer.qid === qid && answer.is_correct);
  
  // Update feedback and correctness based on selected answer
  if (selectedAid) {
    if (correctAnswer && correctAnswer.aid === selectedAid) {
      feedbackMessages.value[index] = 'Correct!';
      answerCorrect.value[index] = true; // Mark as correct
    } else {
      feedbackMessages.value[index] = 'That is wrong. Please try again.';
      answerCorrect.value[index] = false; // Mark as incorrect
    }
  }
  selectedAnswers.value[index] = selectedAid; // Store the selected answer
}

</script>

<template>
  <div>
    <a href="/Student/resourceFiles/questionsPage" class="inline-flex">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2 mt-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg> 
      <h1 class="text-lg">Back to Question Page</h1>
    </a>
  </div>
  <div v-if="currentType === 'practise'">
  <div v-for="(question, index) in questions" :key="question.qid" class="qnDiv">
    <h1 class="questionTitle">{{ question.question }}</h1>
    <div v-for="answer in answers.filter(a => a.qid === question.qid)" :key="answer.aid">
      <Card
        :style="{ 
          backgroundColor: 
            (selectedAnswers[index] === answer.aid && answerCorrect[index] === true) ? '#72c472' : 
            (selectedAnswers[index] === answer.aid && answerCorrect[index] === false) ? '#d25757' : 
            (selectedAnswers[index] === answer.aid) ? '#4682B4' : '#71b7e3' 
        }"
        class="mb-2 cursor-pointer text-black"
        @click="() => { selectedAnswers[index] = answer.aid; feedbackMessages[index] = ''; answerCorrect[index] = null; }"
      >
        <input type="radio" :value="answer.aid" v-model="selectedAnswers[index]" class="hidden" />
        <div class="p-4 text-white">
          {{ answer.option_text }}
        </div>
      </Card>
    </div>
    <div class="button-container" style="margin-top: 20px;">
      <Button class="checkAnswer" @click="checkAnswer(index, question.qid, selectedAnswers[index])">Check answer</Button>
    </div>
    <p class="mb-5 font-xxl font-bold">{{ feedbackMessages[index] }}</p>
    <hr>
  </div>
  <div class="text-center font-bold" style="font-size: 40px;">
    Congrats! You have reached the end.
    <div>
        <NuxtLink to="/Student/resourceFiles/questionsPage">
            <Button class="checkAnswer">Go Back</Button>
        </NuxtLink>
    </div>
</div>
</div>
</template>

<style>
.qnDiv {
  margin: 20px;
}

.optionCard {
  color: #7bcde9;

}
.questionTitle {
  font-size: 25px;
  font-weight: bolder;
  text-align: left;
  margin-bottom: 10px;
}
.button-container {
  display: flex;              /* Use flexbox for alignment */
  justify-content: flex-end;  /* Align items to the right */
  margin-right: 20px;
}

.checkAnswer {
  display: inline-flex;      /* Keeps the button size based on content */
  padding: 20px;        /* Padding for the button */
  justify-content: center;
  align-items: center;
  cursor: pointer;            /* Change cursor to pointer on hover */
  font-size: 20px;
  margin-bottom: 20px;
}

</style>