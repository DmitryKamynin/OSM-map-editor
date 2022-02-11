import FeatureManager from "../../featureManager/viewModel";
import { LineString, Polygon } from "ol/geom";
import along from "@turf/along";
import length from "@turf/length";
import vectorSource from "../../map/modules/vectorSource/model";
import getPointId from "./getStartPointId";
import turfTransform from "./turfTransform";
import getLeftAndRightSides from "./getLeftAndRightSides";
import { Feature } from "ol";
import getLot from "./getLot";
import StyleControl from "../../colorPicker/model";

const RoadGenerator = () => {
  if (FeatureManager.currentFeature) {
    const geom = FeatureManager.currentFeature.getGeometry() as Polygon;
    const [coords] = geom.getCoordinates();
    const startPointId = getPointId("max", coords);
    const endPointId = getPointId("min", coords);

    const [firstLine, lastLine] = getLeftAndRightSides(
      coords,
      startPointId,
      endPointId
    );
    const delta = [[...coords[startPointId]], [...coords[endPointId]]];
    delta[1][0] = coords[startPointId][0];

    const distance = 0.001;
    const turfDelta = turfTransform(delta);
    const deltaLength = length(turfDelta as any);

    let latArray: number[] = [];

    for (let i = 1; deltaLength > distance * i; i++) {
      const point = along(turfDelta as any, distance * i);
      const geom = turfTransform(point);
      latArray.push(geom.getGeometry().getCoordinates()[1]);
    }

    let route: number[][] = [];
    let turn = false;

    latArray.forEach((lat) => {
      const leftSideId = firstLine.findIndex(
        (edge, i) => edge[1] > lat && lat > firstLine[i + 1]?.[1]
      );
      const rightSideId = lastLine.findIndex(
        (edge, i) => edge[1] > lat && lat > lastLine[i + 1]?.[1]
      );
      if (turn) {
        if (leftSideId !== -1) {
          const lot = getLot(
            [firstLine[leftSideId], firstLine[leftSideId + 1]],
            lat
          );
          route.push([lot, lat]);
        }
        if (rightSideId !== -1) {
          const lot = getLot(
            [lastLine[rightSideId], lastLine[rightSideId + 1]],
            lat
          );
          route.push([lot, lat]);
        }
      } else {
        if (rightSideId !== -1) {
          const lot = getLot(
            [lastLine[rightSideId], lastLine[rightSideId + 1]],
            lat
          );
          route.push([lot, lat]);
        }
        if (leftSideId !== -1) {
          const lot = getLot(
            [firstLine[leftSideId], firstLine[leftSideId + 1]],
            lat
          );
          route.push([lot, lat]);
        }
      }
      turn = !turn;
    });

    const Route = new Feature({
      geometry: new LineString(route),
    });
    const styleControl = new StyleControl("#000");
    Route.setStyle(styleControl.style);
    // Сохраняю объект класса, styleControl в пропсах фичи, чтобы можно было манипулировать её стилем в будущем в FeatureManager
    Route.setProperties({
      styleControl,
    });
    vectorSource.addFeature(Route);
  }
};

export default RoadGenerator;
