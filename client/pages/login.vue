<template>
    <div>
        <Head>
            <Title>APP - Login</Title>
        </Head>
        <div class="p-5 sm:w-auto max-w-xl m-auto">
            <Card class="w-full p-10 mt-32">
                <!-- Session Status -->
                <NuxtLink to="/">
                    <Button variant="destructive"> Back </Button>
                </NuxtLink>
                <p class="text-3xl font-bold text-center pb-8">Sign In</p>
                <!-- Email Address -->
                <div>
                    <Label class="text-gray-500" for="email">Email</Label>
                    <Input
                        id="email"
                        v-model:input="credentials.email"
                        input-type="email"
                        class="block mt-1 w-full"
                        required
                        auto-focus
                    />
                </div>

                <!-- Password -->
                <div class="mt-4">
                    <Label class="text-gray-500" for="password">Password</Label>
                    <Input
                        id="password"
                        v-model:input="credentials.password"
                        input-type="password"
                        class="block mt-1 w-full"
                        required
                        auto-complete="current-password"
                    />
                </div>

                <!-- Remember Me -->
                <div class="block mt-4">
                    <label for="remember" class="inline-flex items-center">
                        <input
                            id="remember"
                            v-model="credentials.remember"
                            type="checkbox"
                            name="remember"
                            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <span class="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div class="flex items-center justify-end mt-4">
                    <Button
                        variant="default"
                        class="ml-3"
                        @click.prevent="login"
                    >
                        Login
                    </Button>
                </div>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';

const { $axios } = useNuxtApp();

const credentials = reactive({
    email: 'admin@mail.com',
    password: 'admin1234',
    remember: false,
});

async function login() {
    try {
        await $axios.get('/sanctum/csrf-cookie');

        await $axios.post('/login', {
            email: credentials.email,
            password: credentials.password,
            remember: credentials.remember,
        });

        const response = await $axios.get('/api/user');
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
</script>
