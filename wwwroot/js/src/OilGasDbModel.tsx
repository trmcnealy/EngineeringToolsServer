export interface OilGasDataSource {
    OilGasDb?: OilGasDb[];
}

export interface OilGasDb {
    Well?: Well;
}

export interface Well {
    Id?: number;
    Api?: string;
    Name?: string;
    Number?: string;
    LeaseId?: number;
    FieldId?: number;
    CompanyId?: number;
    Lease?: Field;
    Field?: Field;
    Company?: Company;
    Location?: Location;
    WellboreDetails?: WellboreDetails;
    CompletionDetails?: CompletionDetails;
    ReservoirData?: ReservoirData;
    MonthlyProduction?: MonthlyProductionRecord[];
}

export interface Company {
    Id?: number;
    Name?: string;
    Number?: number;
}

export interface CompletionDetails {
    Id?: number;
    StartDate?: Date;
    EndDate?: null;
    ReservoirName?: null;
    LateralLength?: null;
    TreatmentCount?: null;
    ClusterPerTreatmentCount?: null;
    ProppantType?: null;
    ProppantMesh?: null;
    MaxProppantConcentration?: null;
    WellId?: number;
    PerforationIntervals?: PerforationIntervalRecord[];
}

export interface PerforationIntervalRecord {
    PerforationInterval?: PerforationInterval;
}

export interface PerforationInterval {
    Id?: number;
    Count?: number;
    StartDepth?: number;
    EndDepth?: number;
    CompletionDetailsId?: number;
}

export interface Field {
    Id?: number;
    Name?: string;
    Number?: number;
    District?: number;
}

export interface Location {
    Api?: string;
    SurfaceLatitude27?: number;
    SurfaceLongitude27?: number;
    BottomLatitude27?: number;
    BottomLongitude27?: number;
    SurfaceLatitude83?: number;
    SurfaceLongitude83?: number;
    BottomLatitude83?: number;
    BottomLongitude83?: number;
    SurfaceEasting27?: number;
    SurfaceNorthing27?: number;
    BottomEasting27?: number;
    BottomNorthing27?: number;
    SurfaceEasting83?: number;
    SurfaceNorthing83?: number;
    BottomEasting83?: number;
    BottomNorthing83?: number;
}

export interface MonthlyProductionRecord {
    MonthlyProduction?: MonthlyProduction;
}

export interface MonthlyProduction {
    Id?: number;
    Date?: Date;
    GasVolume?: number;
    OilVolume?: number;
    CondensateVolume?: number;
    WaterVolume?: number;
    WellId?: number;
}

export interface ReservoirData {
    Id?: number;
    ReservoirName?: string;
    ReservoirDepth?: number;
    WellId?: number;
    ReservoirProperties?: null;
    GasProperties?: null;
    OilProperties?: null;
    WaterProperties?: null;
}

export interface WellboreDetails {
    Elevation?: number;
    ElevationDatum?: string;
    TotalDepth?: number;
    TotalLength?: number;
    WellId?: number;
}

export class Convert {
    public static toOilGasDataSource(json: any): OilGasDataSource {
        return cast(json, r("OilGasDataSource"));
    }

    public static oilGasDataSourceToJson(value: OilGasDataSource): any {
        return uncast(value, r("OilGasDataSource"));
    }

    public static toOilGasDb(json: any): OilGasDb {
        return cast(json, r("OilGasDb"));
    }

    public static oilGasDbToJson(value: OilGasDb): any {
        return uncast(value, r("OilGasDb"));
    }

    public static toWell(json: any): Well {
        return cast(json, r("Well"));
    }

    public static wellToJson(value: Well): any {
        return uncast(value, r("Well"));
    }

    public static toCompany(json: any): Company {
        return cast(json, r("Company"));
    }

    public static companyToJson(value: Company): any {
        return uncast(value, r("Company"));
    }

    public static toCompletionDetails(json: any): CompletionDetails {
        return cast(json, r("CompletionDetails"));
    }

    public static completionDetailsToJson(value: CompletionDetails): any {
        return uncast(value, r("CompletionDetails"));
    }

    public static toPerforationIntervalRecord(json: any): PerforationIntervalRecord {
        return cast(json, r("PerforationIntervalRecord"));
    }

    public static perforationIntervalRecordToJson(value: PerforationIntervalRecord): any {
        return uncast(value, r("PerforationIntervalRecord"));
    }

    public static toPerforationInterval(json: any): PerforationInterval {
        return cast(json, r("PerforationInterval"));
    }

    public static PerforationIntervalToJson(value: PerforationInterval): any {
        return uncast(value, r("PerforationInterval"));
    }

    public static toField(json: any): Field {
        return cast(json, r("Field"));
    }

    public static fieldToJson(value: Field): any {
        return uncast(value, r("Field"));
    }

    public static toLocation(json: any): Location {
        return cast(json, r("Location"));
    }

    public static locationToJson(value: Location): any {
        return uncast(value, r("Location"));
    }

    public static toMonthlyProductionRecord(json: any): MonthlyProductionRecord {
        return cast(json, r("MonthlyProductionRecord"));
    }

    public static monthlyProductionRecordToJson(value: MonthlyProductionRecord): any {
        return uncast(value, r("MonthlyProductionRecord"));
    }

    public static toMonthlyProduction(json: any): MonthlyProduction {
        return cast(json, r("MonthlyProduction"));
    }

    public static MonthlyProductionToJson(value: MonthlyProduction): any {
        return uncast(value, r("MonthlyProduction"));
    }

    public static toReservoirData(json: any): ReservoirData {
        return cast(json, r("ReservoirData"));
    }

    public static reservoirDataToJson(value: ReservoirData): any {
        return uncast(value, r("ReservoirData"));
    }

    public static toWellboreDetails(json: any): WellboreDetails {
        return cast(json, r("WellboreDetails"));
    }

    public static wellboreDetailsToJson(value: WellboreDetails): any {
        return uncast(value, r("WellboreDetails"));
    }
}

function invalidValue(typ: any, val: any, key: any = ""): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => (map[p.json] = {key: p.js, typ: p.typ}));
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => (map[p.js] = {key: p.json, typ: p.typ}));
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ""): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid Records
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map((el) => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: {[k: string]: any}, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach((key) => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach((key) => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = val[key];
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers")
            ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")
                ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props")
                    ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return {arrayItems: typ};
}

function u(...typs: any[]) {
    return {unionMembers: typs};
}

function o(props: any[], additional: any) {
    return {props, additional};
}

function m(additional: any) {
    return {props: [], additional};
}

function r(name: string) {
    return {ref: name};
}

const typeMap: any = {
    OilGasDataSource: o([{json: "OilGasDb", js: "OilGasDb", typ: u(undefined, a(r("OilGasDb")))}], false),
    OilGasDb: o([{json: "Well", js: "Well", typ: u(undefined, r("Well"))}], false),
    Well: o(
        [
            {json: "Id", js: "Id", typ: u(undefined, 0)},
            {json: "Api", js: "Api", typ: u(undefined, "")},
            {json: "Name", js: "Name", typ: u(undefined, "")},
            {json: "Number", js: "Number", typ: u(undefined, "")},
            {json: "LeaseId", js: "LeaseId", typ: u(undefined, 0)},
            {json: "FieldId", js: "FieldId", typ: u(undefined, 0)},
            {json: "CompanyId", js: "CompanyId", typ: u(undefined, 0)},
            {json: "Lease", js: "Lease", typ: u(undefined, r("Field"))},
            {json: "Field", js: "Field", typ: u(undefined, r("Field"))},
            {json: "Company", js: "Company", typ: u(undefined, r("Company"))},
            {json: "Location", js: "Location", typ: u(undefined, r("Location"))},
            {json: "WellboreDetails", js: "WellboreDetails", typ: u(undefined, r("WellboreDetails"))},
            {json: "CompletionDetails", js: "CompletionDetails", typ: u(undefined, r("CompletionDetails"))},
            {json: "ReservoirData", js: "ReservoirData", typ: u(undefined, r("ReservoirData"))},
            {json: "MonthlyProduction", js: "MonthlyProduction", typ: u(undefined, a(r("MonthlyProductionRecord")))}
        ],
        false
    ),
    Company: o([{json: "Id", js: "Id", typ: u(undefined, 0)}, {json: "Name", js: "Name", typ: u(undefined, "")}, {json: "Number", js: "Number", typ: u(undefined, 0)}], false),
    CompletionDetails: o(
        [
            {json: "Id", js: "Id", typ: u(undefined, 0)},
            {json: "StartDate", js: "StartDate", typ: u(undefined, Date)},
            {json: "EndDate", js: "EndDate", typ: u(undefined, null)},
            {json: "ReservoirName", js: "ReservoirName", typ: u(undefined, null)},
            {json: "LateralLength", js: "LateralLength", typ: u(undefined, null)},
            {json: "TreatmentCount", js: "TreatmentCount", typ: u(undefined, null)},
            {json: "ClusterPerTreatmentCount", js: "ClusterPerTreatmentCount", typ: u(undefined, null)},
            {json: "ProppantType", js: "ProppantType", typ: u(undefined, null)},
            {json: "ProppantMesh", js: "ProppantMesh", typ: u(undefined, null)},
            {json: "MaxProppantConcentration", js: "MaxProppantConcentration", typ: u(undefined, null)},
            {json: "WellId", js: "WellId", typ: u(undefined, 0)},
            {json: "PerforationIntervals", js: "PerforationIntervals", typ: u(undefined, a(r("PerforationIntervalRecord")))}
        ],
        false
    ),
    PerforationIntervalRecord: o([{json: "PerforationInterval", js: "PerforationInterval", typ: u(undefined, r("PerforationInterval"))}], false),
    PerforationInterval: o(
        [
            {json: "Id", js: "Id", typ: u(undefined, 0)},
            {json: "Count", js: "Count", typ: u(undefined, 0)},
            {json: "StartDepth", js: "StartDepth", typ: u(undefined, 0)},
            {json: "EndDepth", js: "EndDepth", typ: u(undefined, 0)},
            {json: "CompletionDetailsId", js: "CompletionDetailsId", typ: u(undefined, 0)}
        ],
        false
    ),
    Field: o(
        [
            {json: "Id", js: "Id", typ: u(undefined, 0)},
            {json: "Name", js: "Name", typ: u(undefined, "")},
            {json: "Number", js: "Number", typ: u(undefined, 0)},
            {json: "District", js: "District", typ: u(undefined, 0)}
        ],
        false
    ),
    Location: o(
        [
            {json: "Api", js: "Api", typ: u(undefined, "")},
            {json: "SurfaceLatitude27", js: "SurfaceLatitude27", typ: u(undefined, 3.14)},
            {json: "SurfaceLongitude27", js: "SurfaceLongitude27", typ: u(undefined, 3.14)},
            {json: "BottomLatitude27", js: "BottomLatitude27", typ: u(undefined, 3.14)},
            {json: "BottomLongitude27", js: "BottomLongitude27", typ: u(undefined, 3.14)},
            {json: "SurfaceLatitude83", js: "SurfaceLatitude83", typ: u(undefined, 3.14)},
            {json: "SurfaceLongitude83", js: "SurfaceLongitude83", typ: u(undefined, 3.14)},
            {json: "BottomLatitude83", js: "BottomLatitude83", typ: u(undefined, 3.14)},
            {json: "BottomLongitude83", js: "BottomLongitude83", typ: u(undefined, 3.14)},
            {json: "SurfaceEasting27", js: "SurfaceEasting27", typ: u(undefined, 3.14)},
            {json: "SurfaceNorthing27", js: "SurfaceNorthing27", typ: u(undefined, 3.14)},
            {json: "BottomEasting27", js: "BottomEasting27", typ: u(undefined, 3.14)},
            {json: "BottomNorthing27", js: "BottomNorthing27", typ: u(undefined, 3.14)},
            {json: "SurfaceEasting83", js: "SurfaceEasting83", typ: u(undefined, 3.14)},
            {json: "SurfaceNorthing83", js: "SurfaceNorthing83", typ: u(undefined, 3.14)},
            {json: "BottomEasting83", js: "BottomEasting83", typ: u(undefined, 3.14)},
            {json: "BottomNorthing83", js: "BottomNorthing83", typ: u(undefined, 3.14)}
        ],
        false
    ),
    MonthlyProductionRecord: o([{json: "MonthlyProduction", js: "MonthlyProduction", typ: u(undefined, r("MonthlyProduction"))}], false),
    MonthlyProduction: o(
        [
            {json: "Id", js: "Id", typ: u(undefined, 0)},
            {json: "Date", js: "Date", typ: u(undefined, Date)},
            {json: "GasVolume", js: "GasVolume", typ: u(undefined, 0)},
            {json: "OilVolume", js: "OilVolume", typ: u(undefined, 0)},
            {json: "CondensateVolume", js: "CondensateVolume", typ: u(undefined, 0)},
            {json: "WaterVolume", js: "WaterVolume", typ: u(undefined, 0)},
            {json: "WellId", js: "WellId", typ: u(undefined, 0)}
        ],
        false
    ),
    ReservoirData: o(
        [
            {json: "Id", js: "Id", typ: u(undefined, 0)},
            {json: "ReservoirName", js: "ReservoirName", typ: u(undefined, "")},
            {json: "ReservoirDepth", js: "ReservoirDepth", typ: u(undefined, 0)},
            {json: "WellId", js: "WellId", typ: u(undefined, 0)},
            {json: "ReservoirProperties", js: "ReservoirProperties", typ: u(undefined, null)},
            {json: "GasProperties", js: "GasProperties", typ: u(undefined, null)},
            {json: "OilProperties", js: "OilProperties", typ: u(undefined, null)},
            {json: "WaterProperties", js: "WaterProperties", typ: u(undefined, null)}
        ],
        false
    ),
    WellboreDetails: o(
        [
            {json: "Elevation", js: "Elevation", typ: u(undefined, 0)},
            {json: "ElevationDatum", js: "ElevationDatum", typ: u(undefined, "")},
            {json: "TotalDepth", js: "TotalDepth", typ: u(undefined, 0)},
            {json: "TotalLength", js: "TotalLength", typ: u(undefined, 0)},
            {json: "WellId", js: "WellId", typ: u(undefined, 0)}
        ],
        false
    )
};
