/// <reference path="../../_references.ts"/>

export module data {
    /** Represents common expression patterns for 'field' expressions such as columns, column aggregates, measures, etc. */
    export interface FieldExprPattern {
        column?: FieldExprColumnPattern;
        columnAggr?: FieldExprColumnAggrPattern;
        // columnVariation?: FieldExprColumnVariationPattern;  // TODO: Implement this for Time Intelligence.
        entityAggr?: FieldExprEntityAggrPattern;
        // hierarchyLevel?: FieldExprHierarchyLevelPattern; // TODO: Implement this for hierarchy levels.
        measure?: FieldExprMeasurePattern;
    }

    export interface FieldExprEntityItemPattern {
        schema: string;
        entity: string;
        entityVar?: string;
    }

    export interface FieldExprPropertyPattern extends FieldExprEntityItemPattern {
        name: string;
    }

    export type FieldExprColumnPattern = FieldExprPropertyPattern;

    export interface FieldExprColumnAggrPattern extends FieldExprColumnPattern {
        aggregate: QueryAggregateFunction;
    }

    // TODO: Implement this for Time Intelligence.
    //export interface FieldExprColumnVariationPattern extends FieldExprEntityItemPattern {
    //    variationSource: FieldExprColumnPattern;
    //    name: string;
    //}

    export interface FieldExprEntityAggrPattern extends FieldExprEntityItemPattern {
        aggregate: QueryAggregateFunction;
    }

    export type FieldExprMeasurePattern = FieldExprPropertyPattern;

    export module SQExprConverter {
        export function asFieldPattern(sqExpr: SQExpr): FieldExprPattern {
            return sqExpr.accept(FieldExprPatternBuilder.instance);
        }
    }

    interface SourceExprPattern {
        entity?: FieldExprEntityItemPattern;
        //variation?: FieldExprColumnPattern;
    }

    class FieldExprPatternBuilder extends DefaultSQExprVisitor<FieldExprPattern> {
        public static instance: FieldExprPatternBuilder = new FieldExprPatternBuilder();

        public visitColumnRef(expr: SQColumnRefExpr): FieldExprPattern {
            let sourceRef = expr.source.accept(SourceExprPatternBuilder.instance);
            if (!sourceRef) return;

            if (sourceRef.entity) {
                let columnRef = <FieldExprColumnPattern>sourceRef.entity;
                columnRef.name = expr.ref;

                return {column: columnRef};
            }
        }

        public visitMeasureRef(expr: SQMeasureRefExpr): FieldExprPattern {
            let sourceRef = expr.source.accept(SourceExprPatternBuilder.instance);
            if (!sourceRef) return;

            if (sourceRef.entity) {
                let measureRef = <FieldExprMeasurePattern>sourceRef.entity;
                measureRef.name = expr.ref;

                return {measure: measureRef};
            }
        }

        public visitAggr(expr: SQAggregationExpr): FieldExprPattern {
            let fieldPattern: FieldExprPattern = expr.arg.accept(this);
            if (fieldPattern && fieldPattern.column) {
                let argAggr = <FieldExprColumnAggrPattern>fieldPattern.column;
                argAggr.aggregate = expr.func;

                return {columnAggr: argAggr};
            }

            let sourcePattern = expr.arg.accept(SourceExprPatternBuilder.instance);
            if (sourcePattern && sourcePattern.entity) {
                let argAggr = <FieldExprEntityAggrPattern>sourcePattern.entity;
                argAggr.aggregate = expr.func;

                return {entityAggr: argAggr};
            }
        }
    }

    class SourceExprPatternBuilder extends DefaultSQExprVisitor<SourceExprPattern> {
        public static instance: SourceExprPatternBuilder = new SourceExprPatternBuilder();

        public visitEntity(expr: SQEntityExpr): SourceExprPattern {
            let entityRef: FieldExprEntityItemPattern = {
                schema: expr.schema,
                entity: expr.entity
            };
            if (expr.variable) entityRef.entityVar = expr.variable;

            return {entity: entityRef};
        }
    }
}
