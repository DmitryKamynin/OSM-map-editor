import { Geometry, LineString } from "ol/geom";
import { GeoJSON } from "ol/format";
import { GeoJSONObject } from "ol/format/GeoJSON";
import { Feature } from "ol";

type TurfTransform = {
  (obj: number[][]): GeoJSONObject;
  (obj: Geometry): GeoJSONObject;
  (obj: GeoJSONObject): Feature<any>;
};

// @ts-ignore
const turfTransform: TurfTransform = (obj) => {
  const formatter = new GeoJSON();
  if (obj instanceof Geometry) {
    obj.transform("EPSG:3857", "EPSG:4326");
    return formatter.writeGeometryObject(obj);
  } else if (obj instanceof Array) {
    const line = new LineString(obj);
    return turfTransform(line);
  } else {
    const olObject = formatter.readFeature(obj);
    olObject.getGeometry().transform("EPSG:4326", "EPSG:3857");
    return olObject;
  }
};

export default turfTransform;
