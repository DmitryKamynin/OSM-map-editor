import { Feature } from "ol";
import { Geometry, Polygon } from "ol/geom";
import getArea from "../area";
import getLength from "../length";

const calculate = (feature: Feature<Geometry>) => {
  const geometry = feature.getGeometry();
  return geometry instanceof Polygon
    ? {
        area: getArea(feature),
      }
    : {
        length: getLength(feature),
      };
};

const calculateGeomProp = (feature: Feature<Geometry>) => {
  const props = calculate(feature);
  feature.setProperties(props);

  feature.on("change", () => {
    feature.setProperties(calculate(feature));
  });
};

export default calculateGeomProp;
