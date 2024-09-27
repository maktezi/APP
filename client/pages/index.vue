<template>
  <div class="h-screen w-screen relative">
    <Head>
      <Title>APP</Title>
    </Head>

    <!-- Container for logo, display mode, GIF, and content -->
    <div class="flex flex-col justify-between h-full overflow-hidden">
      <!-- Logo and DisplayMode -->
      <div class="flex items-center mb-4 p-4">
        <NuxtLink to="/">
          <Logo />
        </NuxtLink>
        <DisplayMode />
      </div>

      <!-- Content to show after GIF plays -->
      <div v-if="showContent" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-[75vh] w-[90vw] mx-auto">
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

      <!-- Login Button positioned on the right side below the features -->
      <div class="absolute bottom-5 right-5" v-if="showContent">
        <NuxtLink to="/login">
          <Button>Login</Button>
        </NuxtLink>
      </div>

      <!-- Copyright Notice -->
      <div class="text-center text-white py-4">
        &copy; 2024 Your Company Name. All Rights Reserved.
      </div>
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
