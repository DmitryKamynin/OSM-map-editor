import { Feature } from "ol";
import { Geometry, Polygon } from "ol/geom";
import setColor from "../setColor";
import calculateGeomProp from "../calculateGeopProp";
import createOverlay from "../createOverlay";

const featureInit = (feature: Feature<Geometry> | null, color?: string): void => {
  if (feature instanceof Feature) {
    setColor(feature, color);
    calculateGeomProp(feature);
    createOverlay(feature);
  }
};

export default featureInit;
