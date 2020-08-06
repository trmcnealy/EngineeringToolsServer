
export class Guid {

    private static emptyInternal = new Guid("00000000-0000-0000-0000-000000000000");

    private constructor(private strGuid: string) {}

    public static newGuid(): Guid {
        let date = Date.now();

        if (typeof performance !== "undefined" && typeof performance.now === "function") {
            date += performance.now();
        }

        const strGuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = ((date + Math.random() * 16) % 16) | 0;

            date = Math.floor(date / 16);

            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });

        return new Guid(strGuid);
    }

    public static get empty(): Guid {
        return this.emptyInternal;
    }

    toString(): string {
        return this.strGuid;
    }
}
