import { map } from "../view";
import ToolsStore from "../../tools/viewModel";
import FeatureManager from "../../featureManager/viewModel";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import vectorSource from "../modules/vectorSource/model";
import deleteOverlay from "../../utils/deleteOverlay";

const mapControlInit = () => {
  map.on("click", (e) => {
    if (ToolsStore.currentTool === "none") {
      const features = map.getFeaturesAtPixel(e.pixel) as [Feature<Geometry>];
      FeatureManager.setCurrentFeature(features[0]);
    }
  });

  // map.on("movestart", () => {
  //   if (animationControl.runAnimation) {
  //     animationControl.setAutoPause(true);
  //     animationControl.stopMove();
  //   }
  // });
  //
  // map.on("moveend", () => {
  //   if (animationControl.autoPause) {
  //     animationControl.setAutoPause(false);
  //     animationControl.startMove();
  //   }
  // });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Delete") {
      if (FeatureManager.currentFeature) {
        vectorSource.removeFeature(FeatureManager.currentFeature);
        deleteOverlay(FeatureManager.currentFeature);
        FeatureManager.clearCurrentFeature();
      }
    }
  });
};

export default mapControlInit;
