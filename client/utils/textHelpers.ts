export function getPluralModelName(modelName: string): string {
    if (modelName.endsWith('y')) {
        return modelName.slice(0, -1) + 'ies';
    }
    return modelName.endsWith('s') ? modelName : `${modelName}s`;
}

export function getSingularModelName(modelName: string): string {
    return modelName.endsWith('s') ? modelName.slice(0, -1) : modelName;
}

export function getCapitalizedSingularName(modelName: string): string {
    const singularModelName = getSingularModelName(modelName);
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
