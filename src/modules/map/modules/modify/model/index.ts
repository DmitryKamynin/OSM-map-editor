import { Modify } from "ol/interaction";
import vectorSource from "../../vectorSource/model";
import StyleControl from "../../../../colorPicker/model";
import FeatureManager from "../../../../featureManager/viewModel";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import RoadGenerator from "../../../../roadGenerator/viewmodel";

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

modify.on("change", () => {
  const feature = FeatureManager.currentFeature;
  if (feature) {
    RoadGenerator();
  }
});

export default modify;
