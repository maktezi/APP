<template>
    <div>
        <NuxtLayout name="app-layout">
            <Head>
                <Title>Online Forms</Title>
            </Head>
            <main class="max-w-screen-xl mx-auto">
                <TableHeader title="Online Forms" class="py-2" />
                <div class="flex flex-wrap gap-4 my-4 items-center justify-center">
                    <Button class="p-4 bg-gray-400 w-40 rounded-full">
                        Form 1
                    </Button>
                    <Button class="p-4 bg-gray-400 w-40 rounded-full">
                        Form 2
                    </Button>
                    <Button class="p-4 bg-gray-400 w-40 rounded-full">
                        Form 3
                    </Button>
                    <Button class="p-4 bg-gray-400 w-40 rounded-full">
                        Form 4
                    </Button>
                </div>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
</script>
