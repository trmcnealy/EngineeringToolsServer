export module LogicExtensions {
    export function XOR(a: boolean, b: boolean): boolean {
        return (a || b) && !(a && b);
    }
}
