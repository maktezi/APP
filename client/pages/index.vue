<template>
  <div>
    <Head>
      <Title>APP</Title>
    </Head>

    <!-- Container for logo, display mode, GIF, and content -->
    <div class="items-center justify-center p-6">
      <!-- Logo and DisplayMode -->
      <div class="flex-shrink-0 flex items-center">
        <NuxtLink to="/">
          <Logo />
        </NuxtLink>
        <DisplayMode />
      </div>

      <!-- Content to show after GIF plays -->
      <div v-if="showContent">
        <p class="text-2xl pb-2">Welcome to APP!</p>
        <p class="text-xl pb-2">Explore our features.</p>
        <div>
          <NuxtLink to="/login" class="text-sm text-gray-700 underline">
            <Button>Login</Button>
          </NuxtLink>
        </div>
      </div>

      <!-- GIF placeholder (shows before the content) -->
      <div v-else class="flex m-auto justify-center">
        <img alt="img" src="../assets/working.gif" />
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