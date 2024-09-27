<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center relative">
    <Head>
      <Title>APP</Title>
    </Head>

    <!-- Container for logo, display mode, GIF, and content -->
    <div class="flex flex-col justify-center items-center w-full h-full overflow-hidden">
      
      <!-- Content to show after GIF plays -->
      <div v-if="showContent" class="sample-features grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[75vh] w-[90vw] mx-auto">
        <!-- Feature 1 -->
        <div class="feature-section bg-cover bg-center hover:scale-105 transition-transform duration-300" style="background-image: url('https://i.imgur.com/UULsFJV.png');">
          <div class="bg-black bg-opacity-60 p-5 rounded-lg text-center text-white">
            <h1 class="text-xl lg:text-2xl">Feature 1: Fast and Reliable</h1>
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="feature-section bg-cover bg-center hover:scale-105 transition-transform duration-300" style="background-image: url('https://i.imgur.com/1tZB8Qw.png');">
          <div class="bg-black bg-opacity-60 p-5 rounded-lg text-center text-white">
            <h1 class="text-xl lg:text-2xl">Feature 2: Easy-to-use Interface</h1>
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="feature-section bg-cover bg-center hover:scale-105 transition-transform duration-300" style="background-image: url('https://i.imgur.com/mCSSn0K.png');">
          <div class="bg-black bg-opacity-60 p-5 rounded-lg text-center text-white">
            <h1 class="text-xl lg:text-2xl">Feature 3: Secure and Encrypted</h1>
          </div>
        </div>

        <!-- Feature 5 -->
        <div class="feature-section bg-cover bg-center hover:scale-105 transition-transform duration-300" style="background-image: url('https://i.imgur.com/nJ2qOhw.png');">
          <div class="bg-black bg-opacity-60 p-5 rounded-lg text-center text-white">
            <h1 class="text-xl lg:text-2xl">Feature 5: 24/7 Customer Support</h1>
          </div>
        </div>
      </div>

      <!-- GIF placeholder (shows before the content) -->
      <div v-else class="flex justify-center items-center h-full w-full">
        <img alt="img" src="../assets/backg.gif" />
      </div>
    </div>

    <!-- Login Button positioned on the right side below the features -->
    <div class="absolute bottom-10 right-5" v-if="showContent">
      <NuxtLink to="/login">
        <Button>Login</Button>
      </NuxtLink>
    </div>

    <!-- Copyright Notice -->
    <div class="absolute bottom-0 text-center text-white py-4 w-full">
      &copy; 2024 Yawa Inc. All Rights Reserved.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Import Vue functions
import { Button } from '~/components/ui/button';

const showContent = ref(false); // Ref to control visibility of content

onMounted(() => {
  // Set GIF duration (in milliseconds, 5 seconds for example)
  const gifDuration = 5000;

  // After the GIF duration, show the content and hide the GIF
  setTimeout(() => {
    showContent.value = true;
  }, gifDuration);
});

definePageMeta({
  layout: false,
});
</script>

<style scoped>
/* Custom styles for hover and animations are managed by Tailwind */
</style>
