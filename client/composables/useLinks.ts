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
        title: 'Customers',
        path: '/customers',
        icon: 'fluent:people-team-24-filled',
    },
    {
        title: 'POS',
        path: '/pos',
        icon: 'mdi:monitor-dashboard',
    },
    {
        title: 'Inventory',
        path: '/inventories',
        icon: 'ic:twotone-inventory',
    },
    {
        title: 'Users',
        path: '/users',
        icon: 'mdi:users',
    },
    {
        title: 'Jobs',
        path: '/jobs',
        icon: 'hugeicons:job-search',
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
