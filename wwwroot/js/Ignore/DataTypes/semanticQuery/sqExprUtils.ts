﻿/// <reference path="../_references.ts"/>

export module data {
    export module SQExprUtils {

        /** Returns an array of supported aggregates for a given expr and role. */
        export function getSupportedAggregates(expr: SQExpr, isGroupingOnly: boolean, schema: FederatedConceptualSchema): QueryAggregateFunction[] {
            let emptyList: QueryAggregateFunction[] = [];

            let metadata = getMetadataForUnderlyingType(expr, schema);
            // don't use expr.validate as validate will be using this function and we end up in a recursive loop
            if (!metadata) return emptyList;

            let valueType = metadata.type,
                fieldKind = metadata.kind,
                isPropertyIdentity = metadata.idOnEntityKey,
                Agg = QueryAggregateFunction; // alias

            if (!valueType) return emptyList;

            // Cannot aggregate on model measures
            if (fieldKind === FieldKind.Measure) return emptyList;

            // Cannot aggregate grouping exprs
            if (isGroupingOnly) return emptyList;

            if (valueType.numeric || valueType.integer) {
                var aggregates = [Agg.Sum, Agg.Avg, Agg.Min, Agg.Max, Agg.Count, Agg.CountNonNull, Agg.StandardDeviation, Agg.Variance];
                var sqFieldDef = SqExprConverter.asSQFieldDef(expr);
                var currentSchema = schema.schema(sqFieldDef.schema);
                if (currentSchema.capabilities.supportsMedian) aggregates.push(Agg.Median);
                return aggregates;
            } else if (valueType.text || valueType.bool || valueType.dateTime) {
                if (isPropertyIdentity) return [Agg.CountNonNull];
                return [Agg.Count, Agg.CountNonNull];
            }

            //debug.assertFail("Unexpected expr or role.");
            return emptyList;
        }

        export function indexOfExpr(items: SQExpr[], searchElement: SQExpr): number {
            //debug.assertValue(items, "items");
            //debug.assertValue(searchElement, "searchElement");

            for (let i = 0, len = items.length; i < len; i++) {
                if (SQExpr.equals(items[i], searchElement)) return i;
            }
            return -1;
        }

        export function sequenceEqual(x: SQExpr[], y: SQExpr[]): boolean {
            //debug.assertValue(x, "x");
            //debug.assertValue(y, "y");

            let len = x.length;
            if (len !== y.length) return false;

            for (let i = 0; i < len; i++) {
                if (!SQExpr.equals(x[i], y[i])) return false;
            }

            return true;
        }

        export function uniqueName(namedItems: NamedSQExpr[], expr: SQExpr): string {
            //debug.assertValue(namedItems, "namedItems");

            // Determine all names
            let names: {[name: string]: boolean} = {};
            for (let i = 0, len = namedItems.length; i < len; i++) names[namedItems[i].name] = true;

            return StringExtensions.findUniqueName(names, defaultName(expr));
        }

        /** Generates a default expression name  */
        export function defaultName(expr: SQExpr, fallback: string = "select"): string {
            if (!expr) return fallback;

            return expr.accept(SQExprDefaultNameGenerator.instance, fallback);
        }

        /** Gets a value indicating whether the expr is a model measure or an aggregate. */
        export function isMeasure(expr: SQExpr): boolean {
            //debug.assertValue(expr, "expr");

            return expr.accept(IsMeasureVisitor.instance);
        }

        export function discourageAggregation(expr: SQExpr, schema: FederatedConceptualSchema): boolean {
            //debug.assertValue(expr, "expr");
            //debug.assertValue(schema, "schema");

            let field = SQExprConverter.asSQFieldDef(expr);
            if (!field) return;

            let conceptualSchema = schema.schema(field.schema);
            if (conceptualSchema) return conceptualSchema.capabilities && conceptualSchema.capabilities.discourageQueryAggregateUsage;
        }

        function getMetadataForUnderlyingType(expr: SQExpr, schema: FederatedConceptualSchema): SQExprMetadata {
            // Unwrap the aggregate (if the expr has one), and look at the underlying type.
            let metadata = SQExprBuilder.removeAggregate(expr).getMetadata(schema);

            if (!metadata) metadata = expr.getMetadata(schema);

            return metadata;
        }

        class SQExprDefaultNameGenerator extends DefaultSQExprVisitorWithArg<string, string> {
            public static instance: SQExprDefaultNameGenerator = new SQExprDefaultNameGenerator();

            public visitEntity(expr: SQEntityExpr): string {
                return expr.entity;
            }

            public visitColumnRef(expr: SQColumnRefExpr): string {
                return expr.source.accept(this) + "." + expr.ref;
            }

            public visitMeasureRef(expr: SQMeasureRefExpr, fallback: string): string {
                return expr.source.accept(this) + "." + expr.ref;
            }

            public visitAggr(expr: SQAggregationExpr, fallback: string): string {
                return QueryAggregateFunction[expr.func] + "(" + expr.arg.accept(this) + ")";
            }

            public visitDefault(expr: SQExpr, fallback: string): string {
                return fallback || "expr";
            }
        }

        class IsMeasureVisitor extends DefaultSQExprVisitor<boolean> {
            public static instance: IsMeasureVisitor = new IsMeasureVisitor();

            public visitMeasureRef(expr: SQMeasureRefExpr): boolean {
                return true;
            }

            public visitAggr(expr: SQAggregationExpr): boolean {
                return true;
            }

            public visitDefault(expr: SQExpr): boolean {
                return false;
            }
        }
    }
}
