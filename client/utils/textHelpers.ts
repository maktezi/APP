export function getPluralName(modelName: string): string {
    if (modelName.endsWith('y')) {
        return modelName.slice(0, -1) + 'ies';
    }
    return modelName.endsWith('s') ? modelName : `${modelName}s`;
}

export function getSingularName(modelName: string): string {
    return modelName.endsWith('s') ? modelName.slice(0, -1) : modelName;
}

export function getCapSingularName(modelName: string): string {
    const singularModelName = getSingularName(modelName);
    return (
        singularModelName.charAt(0).toUpperCase() + singularModelName.slice(1)
    );
}

export function toTitleCase(str: string) {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function toCamelCase(str: string): string {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+|[_-])/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase(),
        )
        .replace(/\s+|[_-]/g, '');
}
