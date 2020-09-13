/// <reference path="../../_references.ts"/>

export module data {
    export default class FilterRuleEvaluation extends RuleEvaluation {
        private selection: FilterValueScopeIdsContainer;

        constructor(scopeIds: FilterValueScopeIdsContainer) {
            //debug.assertValue(scopeIds, 'scopeIds');

            super();
            this.selection = scopeIds;
        }

        public evaluate(): any {
            var currentScopeId = this.scopeId,
                selectedScopeIds = this.selection.scopeIds;
            for (var i = 0, len = selectedScopeIds.length; i < len; i++) {
                if (DataViewScopeIdentity.equals(currentScopeId, selectedScopeIds[i])) return !this.selection.isNot;
            }
        }
    }
}
