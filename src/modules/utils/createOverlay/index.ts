import { Feature, Overlay } from "ol";
import { Geometry, LineString, Polygon } from "ol/geom";
import Ruler from "../../map/modules/ruler/view";
import AreaHint from "../../map/modules/areaHint/view";
import { map } from "../../map/view";

const setOverlay = (feature: Feature<Geometry>, overlay: Overlay) => {
  const geometry = feature.getGeometry() as Polygon | LineString;
  const coord = geometry.getCoordinates();
  const isLine = geometry instanceof LineString;
  const props = feature.getProperties();
  const element = isLine ? Ruler(props.length) : AreaHint(props.area);
  overlay.setPosition((isLine ? coord[0] : coord[0][0]) as number[]);
  overlay.setElement(element);
};

const createOverlay = (feature: Feature<Geometry>): void => {
  const overlayRef = new Overlay({ offset: [0, -10] });
  const action = () => {
    setOverlay(feature, overlayRef);
  };
  setOverlay(feature, overlayRef);
  map.addOverlay(overlayRef);

  feature.setProperties({ overlayRef });
  feature.on("change", action);
};

export default createOverlay;
