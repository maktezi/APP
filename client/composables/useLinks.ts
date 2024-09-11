import type { LinkItem } from '~/types';

function filterLinks(links: LinkItem[], is_admin?: any): LinkItem[] {
    return links.filter((link) => {
        return true;
    });
}

const sidebarLinks: LinkItem[] = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: 'mdi:view-dashboard-outline',
    },
    {
        title: 'Users',
        path: '/users',
        icon: 'mdi:users',
    },
    {
        title: 'Products',
        path: '/products',
        icon: 'mdi:storefront',
    },
    {
        title: 'Inventories',
        path: '/inventories',
        icon: 'ic:twotone-inventory',
    },
    {
        title: 'Point of Sale',
        path: '/pos',
        icon: 'mdi:monitor-dashboard',
    },
    {
        title: 'Customers',
        path: '/customers',
        icon: 'mdi:account-multiple',
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: 'mdi:cart-outline',
        // textColor: 'text-gray-500',
        // iconColor: 'text-gray-500',
    },
    {
        title: 'Jobs',
        path: '/jobs',
        icon: 'mdi:calendar-check',
        // textColor: 'text-gray-500',
        // iconColor: 'text-gray-500',
    },
    {
        title: 'Online Forms',
        path: '/online-forms',
        icon: 'mdi:form-select',
        // textColor: 'text-gray-500',
        // iconColor: 'text-gray-500',
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: 'mdi:message-text',
        // textColor: 'text-gray-500',
        // iconColor: 'text-gray-500',
    },
    // {
    //     title: 'Settings',
    //     path: '#',
    //     icon: 'mdi:cog',
    // },
];

export default function useLinks() {
    // const { is_admin } = useUser();

    const links = computed<LinkItem[]>(() => {
        // Future implementation of filtered links
        return filterLinks(sidebarLinks);
    });

    return { links };
}
