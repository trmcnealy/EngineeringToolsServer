export module StringExtensions {
    /**
     * Checks if a string ends with a sub-string.
     */
    export function endsWith(str: string, suffix: string): boolean {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
}
