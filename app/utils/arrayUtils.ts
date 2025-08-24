export const removeDuplicates = <Type>(array: Array<Type> | undefined) => [...new Set(array || [])];
