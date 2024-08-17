<template>
    <div
        class="flex m-auto items-center justify-between bg-red-950 px-3 p-2 rounded mb-1.5"
    >
        <div class="flex items-center gap-2 justify-center">
            <Button
                class="rounded-full bg-gray-100 hover:bg-gray-300 p-1.5 flex items-center justify-center"
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
                <span class="block sm:hidden">POS</span>
                <span class="hidden sm:block">Point of Sales</span>
            </p>
        </div>
        <div class="flex items-center gap-2 justify-between">
            <div class="w-[230px] md:w-[350px] flex items-center relative">
                <span
                    ><Icon
                        name="mdi-search"
                        class="absolute left-2 top-2 text-gray-900"
                        size="25"
                /></span>
                <input
                    placeholder="Search Products"
                    class="pl-8 py-2 w-full text-gray-900 rounded-full outline-none"
                />
            </div>
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

const router = useRouter();
</script>
