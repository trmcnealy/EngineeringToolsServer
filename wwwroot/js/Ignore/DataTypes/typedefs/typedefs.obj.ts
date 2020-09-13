var Lazy = (() => {
    function Lazy(factoryMethod) {
        jsCommon.Utility.throwIfNullOrUndefined(factoryMethod, this, "constructor", "factoryMethod");
        this._factoryMethod = factoryMethod;
    }
    Lazy.prototype.getValue = function () {
        if (this._factoryMethod !== null) {
            this._value = this._factoryMethod();
            // Optimization: Release the factoryMethod, as it could be holding a large object graph.
            this._factoryMethod = null;
        }
        return this._value;
    };
    return Lazy;
})();
