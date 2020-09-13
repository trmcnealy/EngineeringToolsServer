export function isInteger(value: number): boolean {
    return value !== null && value % 1 === 0;
}

/**
 * Extensions for Enumerations.
 */
export module EnumExtensions {
    /**
     * Gets a value indicating whether the value has the bit flags set.
     */
    export function hasFlag(value: number, flag: number): boolean {
        return (value & flag) === flag;
    }

    /**
     * Sets a value of a flag without modifying any other flags.
     */
    export function setFlag(value: number, flag: number): number {
        return (value |= flag);
    }

    /**
     * Resets a value of a flag without modifying any other flags.
     */
    export function resetFlag(value: number, flag: number): number {
        return (value &= ~flag);
    }

    /**
     * According to the TypeScript Handbook, this is safe to do.
     */
    export function toString(enumType: any, value: number): string {
        return enumType[value];
    }

    /**
     * Returns the number of 1's in the specified value that is a set of binary bit flags.
     */
    export function getBitCount(value: number): number {
        if (!isInteger(value)) return 0;

        let bitCount = 0;
        let shiftingValue = value;
        while (shiftingValue !== 0) {
            if ((shiftingValue & 1) === 1) {
                bitCount++;
            }

            shiftingValue = shiftingValue >>> 1;
        }
        return bitCount;
    }
}
