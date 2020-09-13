﻿/// <reference path="../_references.ts"/>

import SQExpr = data.SQExpr;

export interface FillTypeDescriptor extends FillGeneric<boolean> {}

export interface FillDefinition extends FillGeneric<SQExpr> {}

export interface Fill extends FillGeneric<string> {}

/** The "master" interface of a fill object.  Non-generic extensions define the type. */
export interface FillGeneric<T> {
    solid?: {
        color?: T;
    };
    gradient?: {
        startColor?: T;
        endColor?: T;
    };
    pattern?: {
        patternKind?: T;
        color?: T;
    };
}
