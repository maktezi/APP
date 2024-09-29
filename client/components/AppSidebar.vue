<template>
    <div>
        <Sheet>
            <SheetTrigger class="flex items-center justify-center">
                <Icon name="mdi:menu" size="30" class="text-gray-100" />
            </SheetTrigger>

            <SheetContent
                side="left"
                class="sm:w-80 w-full border-transparent sm:border-0 rounded-none md:rounded-r-lg"
            >
                <SheetHeader>
                    <SheetTitle class="hidden" />
                    <SheetDescription class="hidden" />
                    <div class="flex items-center justify-between">
                        <div class="flex items-end gap-2">
                            <Logo />
                            <p class="font-bold text-xl">APP</p>
                        </div>
                    </div>
                    <SheetClose class="w-full mt-4">
                        <NuxtLink
                            v-for="(link, index) in links"
                            :key="index"
                            :to="link.path"
                            class="flex w-full items-center gap-4 px-4 py-3 transition rounded-md cursor-pointer hover:bg-red-400/80 dark:hover:bg-red-900/80"
                        >
                            <Icon
                                size="20"
                                :name="link.icon"
                                :class="link.iconColor"
                            />
                            <span
                                class="text-sm font-semibold"
                                :class="link.textColor"
                                >{{ link.title }}</span
                            >
                        </NuxtLink>
                    </SheetClose>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </div>
</template>

<script setup lang="ts">
import {
    Sheet,
    SheetTitle,
    SheetDescription,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetClose,
} from '~/components/ui/sheet';

const auth = useAuth();
const userRole: ComputedRef<any> = computed(() => auth.role);

const { links } = useLinks(userRole.value);
</script>
