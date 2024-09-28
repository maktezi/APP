import type { LinkItem } from '~/types';

function filterLinks(links: LinkItem[], userRole: number): LinkItem[] {
    return links.filter((link) => {
        return link.roles.includes(userRole);
    });
}

export const sidebarLinks: LinkItem[] = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: 'mdi:view-dashboard-outline',
        roles: [0, 1, 2, 3],
    },
    {
        title: 'Users',
        path: '/users',
        icon: 'mdi:users',
        roles: [1],
    },
    {
        title: 'Categories',
        path: '/categories',
        icon: 'mdi:folder-multiple-outline',
        roles: [1, 3],
    },
    {
        title: 'Products',
        path: '/products',
        icon: 'mdi:storefront',
        roles: [1, 3],
    },
    {
        title: 'Inventories',
        path: '/inventories',
        icon: 'mdi:package-variant-closed',
        roles: [1, 3],
    },
    {
        title: 'Point of Sale',
        path: '/pos',
        icon: 'mdi:monitor-dashboard',
        roles: [1, 2, 3],
    },
    {
        title: 'Customers',
        path: '/customers',
        icon: 'mdi:account-multiple',
        roles: [1, 2, 3],
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: 'mdi:order-bool-ascending-variant',
        roles: [1, 2, 3],
    },
    {
        title: 'Jobs',
        path: '/jobs',
        icon: 'mdi:calendar-check',
        roles: [0, 1, 2, 3],
    },
    {
        title: 'Online Forms',
        path: '/online-forms',
        icon: 'mdi:form-select',
        roles: [0, 1, 2, 3],
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: 'mdi:message-text',
        roles: [0, 1, 2, 3],
    },
    {
        title: 'Settings',
        path: '#',
        icon: 'mdi:cog',
        roles: [1, 3],
    },
];

export default function useLinks(userRole: number) {
    const links = computed<LinkItem[]>(() => {
        return filterLinks(sidebarLinks, userRole);
    });

    return { links };
}
