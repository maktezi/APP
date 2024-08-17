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

interface Links {
    [module: string]: LinkItem & { fullNavigation?: boolean };
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
        icon: 'material-symbols:dashboard-rounded',
    },
    {
        title: 'Products',
        path: '/products',
        icon: 'ic:baseline-inventory',
    },
    {
        title: 'Inventory',
        path: '/inventories',
        icon: 'ic:twotone-inventory',
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
        title: 'Customers',
        path: '/customers',
        icon: 'fluent:people-team-24-filled',
    },
    {
        title: 'Jobs',
        path: '/jobs',
        icon: 'mdi:calendar-check',
    },
    {
        title: 'Messages',
        path: '#',
        icon: 'mdi:message-text',
    },
    {
        title: 'Online Forms',
        path: '#',
        icon: 'fluent:form-24-filled',
    },
    {
        title: 'Reports',
        path: '#',
        icon: 'mdi:file-chart',
    },
    {
        title: 'Settings',
        path: '#',
        icon: 'fluent:settings-24-filled',
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
