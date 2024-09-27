<template>
  <div class="app-container">
    <Head>
      <Title>APP</Title>
    </Head>

    <!-- Container for logo, display mode, GIF, and content -->
    <div class="content-container" :class="{'overflow-hidden': !showContent}">
      <!-- Logo and DisplayMode -->
      <div class="flex-shrink-0 flex items-center mb-4">
        <NuxtLink to="/">
          <Logo />
        </NuxtLink>
        <DisplayMode />
      </div>

      <!-- Content to show after GIF plays -->
      <div v-if="showContent" class="sample-features">
        <!-- Feature 1 -->
        <div class="feature-section" style="background-image: url('https://via.placeholder.com/300x200/ff7f7f/ffffff?text=Feature+1');">
          <div class="feature-content">
            <h1 class="text-2xl text-white">Feature 1: Fast and Reliable</h1>
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="feature-section" style="background-image: url('https://via.placeholder.com/300x200/7f7fff/ffffff?text=Feature+2');">
          <div class="feature-content">
            <h1 class="text-2xl text-white">Feature 2: Easy-to-use Interface</h1>
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="feature-section" style="background-image: url('https://via.placeholder.com/300x200/7fff7f/ffffff?text=Feature+3');">
          <div class="feature-content">
            <h1 class="text-2xl text-white">Feature 3: Secure and Encrypted</h1>
          </div>
        </div>

        <!-- Feature 4 -->
        <div class="feature-section" style="background-image: url('https://via.placeholder.com/300x200/ffff7f/ffffff?text=Feature+4');">
          <div class="feature-content">
            <h1 class="text-2xl text-white">Feature 4: Customizable Dashboard</h1>
          </div>
        </div>

        <!-- Feature 5 -->
        <div class="feature-section" style="background-image: url('https://via.placeholder.com/300x200/ff7fff/ffffff?text=Feature+5');">
          <div class="feature-content">
            <h1 class="text-2xl text-white">Feature 5: 24/7 Customer Support</h1>
          </div>
        </div>
      </div>

      <!-- GIF placeholder (shows before the content) -->
      <div v-else class="flex m-auto justify-center h-full w-full">
        <img alt="img" src="../assets/backg.gif" />
      </div>

      <!-- Login Button positioned on the right side below the features -->
      <div class="login-button-container" v-if="showContent">
        <NuxtLink to="/login">
          <Button>Login</Button>
        </NuxtLink>
      </div>

      <!-- Copyright Notice -->
      <div class="copyright-notice">
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
/* Main container for the app */
.app-container {
  height: 100vh;
  width: 100vw;
  position: relative;
}

/* Prevent scrolling and make sure all features are displayed on the same screen */
.content-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Space between logo, features, and button */
  overflow: hidden; /* Prevent scrolling */
}

/* Grid for features now 75% of the viewport */
.sample-features {
  height: 75vh;
  width: 75vw;
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Single-line grid */
  gap: 20px;
  margin: auto; /* Center the grid */
}

.feature-section {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease; /* Add transition for smooth scaling */
}

.feature-section:hover {
  transform: scale(1.05); /* Scale up on hover */
}

.feature-content {
  background-color: rgba(0, 0, 0, 0.6); /* Dark overlay for readability */
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: white;
}

.login-button-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end; /* Align the button to the right */
}

/* Copyright Notice */
.copyright-notice {
  text-align: center;
  margin: 10px; /* Margin for spacing */
  color: white; /* Change color if needed */
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .sample-features {
    grid-template-columns: repeat(3, 1fr); /* 3 columns for tablets */
    height: 65vh;
    width: 90vw; /* Slightly larger grid for smaller screens */
  }

  .feature-content h1 {
    font-size: 1.5rem; /* Smaller font for smaller screens */
  }
}

@media (max-width: 768px) {
  .sample-features {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for mobile */
    height: 60vh;
    width: 90vw; /* Grid adjusted for mobile */
  }

  .login-button-container {
    bottom: 10px;
    right: 10px;
  }

  .feature-content h1 {
    font-size: 1.25rem; /* Even smaller font for mobile */
  }
}

@media (max-width: 480px) {
  .sample-features {
    grid-template-columns: 1fr; /* Single column for very small devices */
    height: 50vh;
    width: 95vw;
  }

  .login-button-container {
    bottom: 5px;
    right: 5px;
  }

  .feature-content h1 {
    font-size: 1rem; /* Adjust font size for extra small devices */
  }
}
</style>
