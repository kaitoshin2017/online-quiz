<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
    
    <div class="space-y-6">
      <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-2">{{ faq.question }}</h2>
        <p class="text-gray-600">{{ faq.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqs = [
  {
    question: "How do I register for an account?",
    answer: "Click on the 'Sign Up' button and fill in your details. You'll need to provide your name, email, and create a password."
  },
  {
    question: "How do I take a quiz?",
    answer: "After logging in, go to the 'Quizzes' section and select a quiz you want to take. Click 'Start Quiz' to begin."
  },
  {
    question: "How are quiz results calculated?",
    answer: "Your score is based on the number of correct answers. Each question has equal weight in the final score."
  },
  {
    question: "Can I retake a quiz?",
    answer: "Yes, you can retake quizzes multiple times. However, some quizzes may have restrictions set by the teacher."
  }
];
</script> 