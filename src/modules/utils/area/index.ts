import { Geometry, Polygon } from "ol/geom";
import area from "@turf/area";
import { Feature } from "ol";
import { toLonLat } from "ol/proj";
import { polygon } from "@turf/helpers";

const getArea = (feature: Feature<Geometry>) => {
  const geometry = feature.getGeometry() as Polygon;
  const coords = geometry.getCoordinates();
  const lonLatCoords = coords.map((coord) => coord.map((coo) => toLonLat(coo)));
  lonLatCoords[0][0] = lonLatCoords[0][lonLatCoords[0].length - 1];
  const poly = polygon(lonLatCoords);
  const a = area(poly);

  return a.toFixed(2);
};

export default getArea;
