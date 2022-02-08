import { map } from "../view";
import ToolsStore from "../../tools/viewModel";
import FeatureManager from "../../featureManager/viewModel";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import vectorSource from "../modules/vectorSource/model";

const mapControlInit = () => {
  map.on("click", (e) => {
    if (ToolsStore.currentTool === "choice") {
      const features = map.getFeaturesAtPixel(e.pixel) as [Feature<Geometry>];
      FeatureManager.setCurrentFeature(features[0]);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Delete") {
      if (FeatureManager.currentFeature) {
        FeatureManager.removeFromLocalStorage(FeatureManager.currentFeature);
        vectorSource.removeFeature(FeatureManager.currentFeature);
        FeatureManager.clearCurrentFeature();
      }
    }
  });
};

export default mapControlInit;
