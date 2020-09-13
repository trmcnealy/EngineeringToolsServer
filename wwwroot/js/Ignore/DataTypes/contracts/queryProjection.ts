/// <reference path="../_references.ts"/>

export module data {
    /** Represents a projection from a query result. */
    export interface QueryProjection {
        /** Name of item in the semantic query Select clause. */
        queryRef: string;

        /** Optional format string. */
        format?: string; // TODO: Deprecate this, and populate format string through objects instead.
    }

    /** A set of QueryProjections, grouped by visualization property, and ordered within that property. */
    export interface QueryProjectionsByRole {
        [roleName: string]: QueryProjectionCollection;
    }

    export default class QueryProjectionCollection {
        private items: QueryProjection[];
        private _activeProjectionRef: string;

        public constructor(items: QueryProjection[], activeProjectionRef?: string) {
            //debug.assertValue(items, "items");

            this.items = items;
            this._activeProjectionRef = activeProjectionRef;
        }

        /** Returns all projections in a mutable array. */
        public all(): QueryProjection[] {
            return this.items;
        }

        public get activeProjectionQueryRef(): string {
            return this._activeProjectionRef;
        }

        public set activeProjectionQueryRef(value: string) {
            var queryRefs = this.items.map((val) => val.queryRef);
            if (!_.contains(queryRefs, value)) return;
            this._activeProjectionRef = value;
        }

        public clone(): QueryProjectionCollection {
            return new QueryProjectionCollection(_.clone(this.items), this._activeProjectionRef);
        }
    }

    export module QueryProjectionsByRole {
        /** Clones the QueryProjectionsByRole. */
        export function clone(roles: QueryProjectionsByRole): QueryProjectionsByRole {
            //debug.assertValue(roles, "roles");

            var clonedRoles: QueryProjectionsByRole = {};

            for (let roleName in roles) clonedRoles[roleName] = roles[roleName].clone();

            return clonedRoles;
        }

        /** Returns the QueryProjectionCollection for that role.  Even returns empty collections so that 'drillable' and 'activeProjection' fields are preserved. */
        export function getRole(roles: QueryProjectionsByRole, name: string): QueryProjectionCollection {
            //debug.assertAnyValue(roles, "roles");
            //debug.assertValue(name, "name");

            if (!roles) return;

            return roles[name];
        }
    }
}
