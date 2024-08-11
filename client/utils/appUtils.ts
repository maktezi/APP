export function getPluralEntityName(entityName: string): string {
    return entityName.endsWith('s') ? entityName : `${entityName}s`;
}

export function getSingularEntityName(entityName: string): string {
    return entityName.endsWith('s') ? entityName.slice(0, -1) : entityName;
}

export function getCapitalizedSingularName(entityName: string): string {
    const singularEntityName = getSingularEntityName(entityName);
    return (
        singularEntityName.charAt(0).toUpperCase() + singularEntityName.slice(1)
    );
}

export function toTitleCase(str: string) {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
