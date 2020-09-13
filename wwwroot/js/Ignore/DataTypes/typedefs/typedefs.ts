export module Prototype {
    /**
     * Returns a new object with the provided obj as its prototype.
     */
    export function inherit<T>(obj: T, extension?: (inherited: T) => void): T {
        //debug.assertValue(obj, "obj");

        function wrapCtor() {}

        wrapCtor.prototype = obj;

        var inherited = new wrapCtor();

        if (extension) extension(inherited);

        return inherited;
    }
}
