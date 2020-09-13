/// <reference path="../_references.ts"/>

export module data {
    export interface FederatedConceptualSchemaInitOptions {
        schemas: {[name: string]: ConceptualSchema};
        links?: ConceptualSchemaLink[];
    }

    /** Represents a federated conceptual schema. */
    export default class FederatedConceptualSchema {
        private schemas: {[name: string]: ConceptualSchema};
        private links: ConceptualSchemaLink[];

        constructor(options: FederatedConceptualSchemaInitOptions) {
            //debug.assertValue(options, "options");

            this.schemas = options.schemas;
            if (options.links) this.links = options.links;
        }

        public schema(name: string): ConceptualSchema {
            return this.schemas[name];
        }
    }

    /** Describes a semantic relationship between ConceptualSchemas. */
    export interface ConceptualSchemaLink {}
}
