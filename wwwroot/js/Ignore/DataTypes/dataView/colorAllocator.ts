﻿/// <reference path="../_references.ts"/>

export interface IColorAllocator {
    /** Computes the color corresponding to the provided value. */
    color(value: number): string;
}

export interface IColorAllocatorFactory {
    /** Creates a gradient that that transitions between two colors. */
    linearGradient2(options: LinearGradient2): IColorAllocator;
    /** Creates a gradient that that transitions between three colors. */
    linearGradient3(options: LinearGradient3, splitScales: boolean): IColorAllocator;
}
