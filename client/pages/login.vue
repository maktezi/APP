<template>
    <div>
        <Head>
            <Title>APP - Login</Title>
        </Head>
        <div v-auto-animate class="p-5 sm:w-auto max-w-xl m-auto">
            <Card class="w-full p-10 mt-32">
                <!-- Session Status -->
                <NuxtLink
                    to="/"
                    class="rounded-full py-2 bg-destructive flex items-center justify-center w-10"
                >
                    <Icon name="mdi:arrow-left" size="20" />
                </NuxtLink>
                <p class="text-3xl font-bold text-center my-4">Sign In</p>
                <!-- Email Address -->
                <div>
                    <Label class="text-foreground" for="email">Email</Label>
                    <Input
                        id="email"
                        v-model="credentials.email"
                        type="email"
                        class="block mt-1 w-full"
                        required
                        auto-focus
                        @keyup.enter="login"
                    />
                </div>

                <!-- Password -->
                <div class="mt-2">
                    <Label class="text-foreground" for="password"
                        >Password</Label
                    >
                    <Input
                        id="password"
                        v-model="credentials.password"
                        type="password"
                        class="block mt-1 w-full"
                        required
                        auto-complete="current-password"
                        @keyup.enter="login"
                    />
                </div>

                <!-- Remember Me -->
                <div class="block mt-2">
                    <label for="remember" class="inline-flex items-center">
                        <input
                            id="remember"
                            v-model="credentials.remember"
                            type="checkbox"
                            name="remember"
                            class="border-accent-foreground text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        />
                        <span class="ml-2 text-sm text-foreground">
                            Remember me
                        </span>
                    </label>
                </div>

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
                        >{{ loading ? 'Logging in' : 'Login' }}</span
                    >
                </Button>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';

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

    try {
        loading.value = true;

        await auth.getTokens();
        await auth.login(credentials.email, credentials.password);
        await auth.getUser();

        router.push('/dashboard');
        loading.value = false;
    } catch (error: any) {
        toasts(error.response.data.message, {
            type: 'error',
            position: 'top-center',
            autoClose: 3000,
            transition: 'zoom',
            hideProgressBar: true,
        });
        setTimeout(() => {
            loading.value = false;
        }, 5000);
    }
};

definePageMeta({
    middleware: ['guest'],
});
</script>
