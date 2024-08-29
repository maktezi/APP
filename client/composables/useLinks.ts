export interface LinkItem {
    title: string;
    icon: string;
    iconColor?: string;
    textColor?: string;
    path?: string;
    show?: boolean;
    items?: LinkItem[];
    model?: string;
}

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
        title: 'Customers',
        path: '/customers',
        icon: 'mdi:account-multiple',
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: 'mdi:cart-outline',
    },
    {
        title: 'Point of Sale',
        path: '/pos',
        icon: 'mdi:monitor-dashboard',
    },
    {
        title: 'Users',
        path: '/users',
        icon: 'mdi:users',
    },
    {
        title: 'Jobs',
        path: '/jobs',
        icon: 'mdi:calendar-check',
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: 'mdi:message-text',
    },
    {
        title: 'Online Forms',
        path: '/online-forms',
        icon: 'mdi:form-select',
    },
    {
        title: 'Settings',
        path: '#',
        icon: 'mdi:cog',
    },
];

export default function useLinks() {
    // const { is_admin } = useUser();

    const links = computed<LinkItem[]>(() => {
        // Future implementation of filtered links
        return filterLinks(sidebarLinks);
    });

    return { links };
}
