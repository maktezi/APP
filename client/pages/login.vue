<template>
    <Head>
        <Title>APP - Login</Title>
    </Head>
    <div class="p-5 sm:w-auto max-w-xl m-auto">
        <Card class="w-full p-10 mt-40">
            <!-- Session Status -->
            <AuthSessionStatus class="mb-4" :status="status" />
            <NuxtLink to="/">
                <Button variant="destructive">Back</Button>
            </NuxtLink>
            <p class="text-3xl font-bold text-center pb-8">Sign In</p>

            <form @submit.prevent="submit">
                <!-- Email Address -->
                <div>
                    <Label class="text-gray-500" for="email">Email</Label>
                    <Input
                        id="email"
                        v-model="data.email"
                        type="email"
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
                        v-model="data.password"
                        type="password"
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
                            v-model="data.remember"
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
                    <!--          <Button variant="default" class="ml-3" :disabled="inProgress">Login</Button>-->
                    <a
                        href="/dashboard"
                        class="ml-3 bg-black dark:bg-gray-200 text-white dark:text-black px-4 py-2 rounded"
                        >Login</a
                    >
                </div>
            </form>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

const router = useRouter();
const route = useRoute();
const login = ref();

const data = reactive({
    email: "admin@email.com",
    password: "password",
    remember: false,
});
const status = ref(
    (route.query.reset ?? "").length > 0
        ? atob(route.query.reset as string)
        : "",
);

const submit = () => router.push("/dashboard");
</script>
