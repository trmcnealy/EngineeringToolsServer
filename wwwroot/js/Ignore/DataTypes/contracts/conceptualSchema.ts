/// <reference path="_references.ts"/>

export module data {
    export default class ConceptualSchema {
        public entities: ArrayNamedItems<ConceptualEntity>;
        public capabilities: ConceptualCapabilities;

        /** Indicates whether the user can edit this ConceptualSchema.  This is used to enable/disable model authoring UX. */
        public canEdit: boolean;

        public findProperty(entityName: string, propertyName: string): ConceptualProperty {
            var entity = this.entities.withName(entityName);
            if (entity) return entity.properties.withName(propertyName);
        }
    }

    export interface ConceptualCapabilities {
        discourageQueryAggregateUsage: boolean;
        supportsMedian: boolean;
        supportsPercentile: boolean;
    }

    export interface ConceptualEntity {
        name: string;
        hidden?: boolean;
        calculated?: boolean;
        queryable?: ConceptualQueryableState;
        properties: ArrayNamedItems<ConceptualProperty>;
        hierarchies: ArrayNamedItems<ConceptualHierarchy>;
    }

    export interface ConceptualProperty {
        name: string;
        type: ValueType;
        kind: ConceptualPropertyKind;
        hidden?: boolean;
        format?: string;
        column?: ConceptualColumn;
        queryable?: ConceptualQueryableState;
    }

    export interface ConceptualHierarchy {
        name: string;
        levels: ArrayNamedItems<ConceptualHierarchyLevel>;
    }

    export interface ConceptualHierarchyLevel {
        name: string;
        column: ConceptualProperty;
    }

    export interface ConceptualColumn {
        defaultAggregate?: ConceptualDefaultAggregate;
        keys?: ArrayNamedItems<ConceptualProperty>;
        idOnEntityKey?: boolean;
        calculated?: boolean;
    }

    export enum ConceptualQueryableState {
        Queryable = 0,
        Error = 1
    }

    export enum ConceptualPropertyKind {
        Column,
        Measure,
        Kpi
    }

    export enum ConceptualDefaultAggregate {
        Default,
        None,
        Sum,
        Count,
        Min,
        Max,
        Average,
        DistinctCount
    }

    // TODO: Remove this (replaced by ValueType)
    export enum ConceptualDataCategory {
        None,
        Address,
        City,
        Company,
        Continent,
        Country,
        County,
        Date,
        Image,
        ImageUrl,
        Latitude,
        Longitude,
        Organization,
        Place,
        PostalCode,
        Product,
        StateOrProvince,
        WebUrl
    }
}
