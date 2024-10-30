<script setup lang="ts">

definePageMeta({
  layout: "studentview",
});

import {Button} from '@/components/ui/button';
var currentTopic = "BTT";
function changeToFTT() {
  if (currentTopic == "FTT") {
  currentTopic = "FTT";
  }
}
function changeToBTT() {
  if (currentTopic == "FTT") {
    currentTopic = "BTT";
  }
}

// import PDFviewer from '@/components/resources/PDFviewer.vue';

// const pdfUrl = '/path/to/your.pdf';
// const pdfTitle = 'PDF Document';

// const pdf = ref(null);
// const currentPage = ref(1);
// const totalPages = ref(0);
// const scale = ref(1);

import { ref, onMounted } from 'vue';

// Rest of the setup in PDFDocument.vue remains the same


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
  <div class="buttonDiv">
    <Button @click="changeToFTT()" class="testButton" style="background-color: rgb(39, 139, 214);">
      BTT
    </Button>
    <Button @click="changeToBTT()" class="testButton" style="background-color: rgb(87, 163, 87);">
      FTT
    </Button>
  </div>
  <div>
    <h1>PDF Viewer</h1>
    <iframe
      src="externalFiles/FTT.pdf"
      width="100%"
      height="600"
      style="border: none;"
    ></iframe>
  </div>


</template>

<style>
  .testButton {
    font-size: 25px;
    margin: 50px 100px;
    padding: 30px 100px;
  }

  .buttonDiv {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>