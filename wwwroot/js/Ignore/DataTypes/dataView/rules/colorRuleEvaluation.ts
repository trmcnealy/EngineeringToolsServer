/// <reference path="../../_references.ts"/>

export module data {
    export default class ColorRuleEvaluation extends RuleEvaluation {
        private allocator: IColorAllocator;

        constructor(inputRole: string, allocator: IColorAllocator) {
            //debug.assertAnyValue(inputRole, 'inputRole');
            //debug.assertValue(allocator, 'allocator');

            super(inputRole);
            this.allocator = allocator;
        }

        public evaluate(): any {
            return this.allocator.color(this.value);
        }
    }
}
