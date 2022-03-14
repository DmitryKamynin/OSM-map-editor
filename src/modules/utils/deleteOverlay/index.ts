import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { map } from "../../map/view";

const deleteOverlay = (feature: Feature<Geometry>): void => {
  const props = feature.getProperties();
  map.removeOverlay(props.overlayRef);
};

export default deleteOverlay;
