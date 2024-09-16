<template>
    <div
        class="flex m-auto items-center justify-between bg-red-950 px-3 p-2 rounded mb-1.5"
    >
        <div class="flex items-center gap-2 justify-center">
            <Button
                class="rounded-full bg-gray-100 hover:bg-gray-300 p-2 flex items-center justify-center"
                @click="router.push('/dashboard')"
            >
                <Icon
                    name="mdi:exit-to-app"
                    size="25"
                    style="rotate: 180deg"
                    class="text-gray-900"
                />
            </Button>
            <p class="text-gray-100 text-2xl font-bold">
                <span>Messages</span>
            </p>
        </div>
        <div class="flex items-center gap-2 justify-between">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <DisplayMode />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Display Mode</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '~/components/ui/tooltip';
import { Button } from '~/components/ui/button';

const router = useRouter();
</script>
