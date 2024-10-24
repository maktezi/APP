<template>
    <div
        class="w-full rounded-b-lg h-[690px] p-2 bg-card border border-secondary dark:border-primary"
    >
        <div class="w-full rounded-b-lg h-full overflow-y-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            v-for="header in headers"
                            :key="header.key"
                            :class="header.class"
                        >
                            <span class="font-bold">
                                {{ header.label }}
                            </span>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow v-for="item in data" :key="item[primaryKey]">
                        <TableCell
                            v-for="header in headers"
                            :key="header.label"
                        >
                            {{
                                typeof header.key === 'function'
                                    ? header.key(item)
                                    : getNestedValue(item, header.key)
                            }}
                        </TableCell>
                        <TableCell
                            v-if="actions"
                            class="flex m-auto justify-end items-center"
                        >
                            <Button
                                v-for="(action, index) in actions"
                                :key="index"
                                variant="ghost"
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

        <!-- Pagination -->
        <div class="flex justify-start items-center p-2 mt-2">
            <Pagination
                v-slot="{ page }"
                :total="totalItems"
                :page="currentPage"
                :sibling-count="1"
                show-edges
                :default-page="1"
                @page-change="onPageChange"
            >
                <PaginationList
                    v-slot="{ items }"
                    class="flex items-center gap-1"
                >
                    <PaginationFirst />
                    <PaginationPrev />

                    <template v-for="(item, index) in items">
                        <PaginationListItem
                            v-if="item.type === 'page'"
                            :key="index"
                            :value="item.value"
                            as-child
                        >
                            <Button
                                class="w-10 h-10 p-0"
                                :variant="
                                    item.value === currentPage
                                        ? 'default'
                                        : 'outline'
                                "
                            >
                                {{ item.value }}
                            </Button>
                        </PaginationListItem>
                        <PaginationEllipsis
                            v-else
                            :key="item.type"
                            :index="index"
                        />
                    </template>

                    <PaginationNext />
                    <PaginationLast />
                </PaginationList>
            </Pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '~/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table';
import { Button } from '~/components/ui/button';

defineProps<{
    headers: { key: string; label: string; class?: string }[];
    data: Record<string, any>[];
    actions?: { icon: string; handler: (item: any) => void; class?: string }[];
    primaryKey: string;
}>();

// TODO: fix pagination
const totalItems = ref(100);
const currentPage = ref(1);
const perPage = ref(10);

provide('totalItems', totalItems);
provide('currentPage', currentPage);
provide('perPage', perPage);

const onPageChange = (page: number) => {
    currentPage.value = page;
};
</script>
