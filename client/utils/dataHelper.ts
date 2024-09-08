export const getNestedValue = (item: any, key: any) => {
    return key
        .split('.')
        .reduce((acc: any, part: any) => acc && acc[part], item);
};
