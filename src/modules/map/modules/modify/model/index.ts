import { Modify } from "ol/interaction";
import vectorSource from "../../vectorSource/model";
import StyleControl from "../../../../colorPicker/model";
import FeatureManager from "../../../../featureManager/viewModel";
import { Feature } from "ol";
import { Geometry } from "ol/geom";

const modify = new Modify({
  source: vectorSource,
  style: new StyleControl().style,
});

modify.on("modifyend", (e) => {
  const feature = e.features.getArray()[0] as Feature<Geometry>;
  if (feature) {
    const props = feature.getProperties();
    if (props.saved) {
      FeatureManager.removeFromLocalStorage(feature);
      FeatureManager.saveToLocalStorage(feature);
    }
  }
});

export default modify;
