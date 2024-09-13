<template>
    <div :class="isMobile ? 'h-[800px]' : 'h-vh'">
        <div class="text-gray-500 m-auto flex justify-center items-center mt-4">
            <Drawer>
                <DrawerTrigger>
                    <Button class="flex items-center gap-2">
                        <Icon name="mdi:toolbox" size="30" />
                        Open Toolbox
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Toolbox</DrawerTitle>
                        <DrawerDescription> Items here... </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter
                        class="flex justify-center items-center gap-2"
                    >
                        <Button class="w-[100px]"> Save </Button>
                        <DrawerClose>
                            <Button class="w-[100px]" variant="outline">
                                Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';

const isMobile = ref(false);
const checkIsMobile = () => {
    isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
});
</script>
