import { Geometry, LineString } from "ol/geom";
import length from "@turf/length";
import { Feature } from "ol";
import { toLonLat } from "ol/proj";
import { lineString } from "@turf/helpers";

const getLength = (feature: Feature<Geometry>): string => {
  const geometry = feature.getGeometry() as LineString;
  const coords = geometry.getCoordinates();
  const lonLatCoords = coords.map((coord) => toLonLat(coord));
  const line = lineString(lonLatCoords);
  const l = length(line);

  return l.toFixed(3);
};

export default getLength;
