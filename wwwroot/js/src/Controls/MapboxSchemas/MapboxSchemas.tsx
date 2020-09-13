import { all_JSON } from "./mapbox-gl.schema";
import { background_JSON } from "./mapbox-gl.background.schema";
import { circle_JSON } from "./mapbox-gl.circle.schema";
import { fill_JSON } from "./mapbox-gl.fill.schema";
import { fill_extrusion_JSON } from "./mapbox-gl.fill-extrusion.schema";
import { heatmap_JSON } from "./mapbox-gl.heatmap.schema";
import { hillshade_JSON } from "./mapbox-gl.hillshade.schema";
import { line_JSON } from "./mapbox-gl.line.schema";
import { raster_JSON } from "./mapbox-gl.raster.schema";
import { symbol_JSON } from "./mapbox-gl.symbol.schema";

export const all_schema:string = JSON.stringify(all_JSON);

export const background_schema:string = JSON.stringify(background_JSON);
export const circle_schema:string = JSON.stringify(circle_JSON);
export const fill_schema:string = JSON.stringify(fill_JSON);
export const fill_extrusion_schema:string = JSON.stringify(fill_extrusion_JSON);
export const heatmap_schema:string = JSON.stringify(heatmap_JSON);
export const hillshade_schema:string = JSON.stringify(hillshade_JSON);
export const line_schema:string = JSON.stringify(line_JSON);
export const raster_schema:string = JSON.stringify(raster_JSON);
export const symbol_schema:string = JSON.stringify(symbol_JSON);
