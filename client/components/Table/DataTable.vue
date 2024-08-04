<template>
    <div class="w-full border dark:border-gray-800 rounded-b-lg">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead
                        v-for="header in headers"
                        :key="header.key"
                        :class="header.class"
                        class="text-bold"
                    >
                        {{ header.label }}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="item in data" :key="item[primaryKey]">
                    <TableCell v-for="header in headers" :key="header.key">
                        {{ item[header.key] }}
                    </TableCell>
                    <TableCell
                        v-if="actions"
                        class="flex m-auto justify-end items-center"
                    >
                        <Button
                            v-for="(action, index) in actions"
                            :key="index"
                            class="mx-0.5 rounded-full"
                            :class="action.class"
                            size="icon"
                            @click="action.handler(item)"
                        >
                            <Icon :name="action.icon" size="22" />
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script setup lang="ts">
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

const props = defineProps<{
    headers: { key: string; label: string; class?: string }[];
    data: Record<string, any>[];
    actions?: { icon: string; handler: (item: any) => void; class?: string }[];
    primaryKey: string;
}>();
</script>
