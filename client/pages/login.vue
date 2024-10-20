<template>
  <div class="min-h-screen flex flex-col justify-center bg-gray-900">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-center p-6 md:p-10 space-y-10 md:space-y-0">
      <!-- Logo and Welcome Text Section -->
      <div class="md:flex-1 flex flex-col items-center text-center md:text-left px-4">
        <img src="../assets/no-image.jpg" alt="Logo" class="mb-8 w-48 md:w-64" />
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">POS SYSTEM</h1>
        <p class="text-gray-400 max-w-md">
          Welcome to POS System! Please log in to streamline your
          <span class="text-yellow-500">sales, manage inventory,</span>
          and enhance your <span class="text-yellow-500">customer experience.</span> Let's get started!
        </p>
      </div>

      <!-- Login Card Section -->
      <div class="md:flex-1 max-w-full md:max-w-sm bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg mx-4 md:mx-0">
        <h2 class="text-2xl font-semibold text-center text-white mb-6">Sign In</h2>
        <form @submit.prevent="login">
          <!-- Username Field -->
          <div class="mb-4">
            <label for="email" class="text-gray-300">Username</label>
            <input
              id="email"
              v-model="credentials.email"
              type="email"
              class="block w-full mt-1 p-3 md:p-4 bg-gray-700 text-white border-none rounded-md focus:ring-yellow-500 focus:ring-2 text-base md:text-lg placeholder-gray-400"
              placeholder="Enter your username"
              required
              autofocus
            />
          </div>

          <!-- Password Field -->
          <div class="mb-6">
            <label for="password" class="text-gray-300">Password</label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              class="block w-full mt-1 p-3 md:p-4 bg-gray-700 text-white border-none rounded-md focus:ring-yellow-500 focus:ring-2 text-base md:text-lg placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <!-- Remember Me Checkbox -->
          <div class="flex items-center justify-between mb-6">
            <label for="remember" class="inline-flex items-center">
              <input
                id="remember"
                v-model="credentials.remember"
                type="checkbox"
                class="text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span class="ml-2 text-sm text-gray-400">Remember me</span>
            </label>
          </div>

          <!-- Submit Button -->
          <Button
            :disabled="loading"
            class="w-full bg-primary mt-6"
            @click.prevent="login"
          >
            <SpinnerTadpole
              :class="{ hidden: !loading }"
              class="size-7 text-card dark:text-card-foreground mx-1"
            />
            <span
              class="font-bold"
              :class="{ 'animate-pulse ml-2': loading }"
            >{{ loading ? 'Logging in' : 'Login' }}</span>
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuth();
const loading = ref(false);
const errors = ref(null);
const router = useRouter();

const credentials = reactive({
    email: 'admin@mail.com',
    password: 'admin1234',
    remember: false,
});

const login = async () => {
    errors.value = null;
    loading.value = true;

    try {
        await auth.getTokens();
        await auth.login(credentials.email, credentials.password);
        await auth.getUser();
        router.push('/dashboard');
    } catch (error: any) {
        console.error(error); // Log the full error for debugging
        const message = error.response?.data?.message || 'An error occurred. Please try again.';
        toasts(message, {
            type: 'error',
            position: 'top-center',
            autoClose: 3000,
            transition: 'zoom',
            hideProgressBar: true,
        });
    } finally {
        loading.value = false; // Always stop loading
    }
};

definePageMeta({
    middleware: ['guest'],
});
</script>
