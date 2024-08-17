<template>
    <nav class="bg-red-950 m-0">
        <!-- Primary Navigation Menu  -->
        <div class="max-w-full mx-auto">
            <div class="flex justify-between h-14">
                <div class="flex ml-3">
                    <AppSidebar />
                </div>
                <!-- Settings Dropdown  -->
                <div
                    class="flex items-center bg-red-900 pl-6 pr-4 rounded-l-full"
                >
                    <Dropdown class="mr-3" align="right">
                        <template #trigger>
                            <button
                                class="flex items-center text-sm font-medium text-white hover:text-gray-700 focus:outline-none transition duration-250 ease-in-out"
                            >
                                <!--                 <div>{{ user?.name }}</div> -->
                                <div>Super User</div>

                                <div class="ml-1">
                                    <svg
                                        class="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </template>
                        <!-- Authentication  -->
                        <!--            <DropdownButton @click="logout"> -->
                        <!--              Logout -->
                        <!--            </DropdownButton> -->
                        <DropdownButton>
                            <Button
                                class="flex items-center gap-1 justify-center"
                            >
                                <Icon name="ri:logout-circle-line" size="25" />
                                <a href="/">Logout</a>
                            </Button>
                        </DropdownButton>
                    </Dropdown>
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
        </div>
    </nav>
</template>

<script setup lang="ts">
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const user = ref();
const open = ref(false);
</script>
