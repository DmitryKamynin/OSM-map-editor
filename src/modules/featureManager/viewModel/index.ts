import FeatureManagerModel from "../model";
import { Feature } from "ol";
import { Geometry, LineString, Polygon } from "ol/geom";
import StyleControl from "../../colorPicker/model";
import vectorSource from "../../map/modules/vectorSource/model";
import featureInit from "../../utils/featureInit";

const FeatureManager = FeatureManagerModel.actions((self) => {
  const styleControl = new StyleControl("#15a626", [10]);
  styleControl.addStyle();

  // отрисовка сохранёных фич
  self.storage.forEach((item) => {
    const geom = item.type === "Polygon" ? new Polygon(item.coords) : new LineString(item.coords);
    const feature = new Feature({
      geometry: geom,
    });

    featureInit(feature, item.color);

    vectorSource.addFeature(feature);
  });

  return {
    // Логика по выбору текущей фичи
    setCurrentFeature(feature?: Feature<Geometry>) {
      if (feature && self.currentFeature && feature !== self.currentFeature) {
        const props = self.currentFeature.getProperties();

        if (props?.styleControl?.style) self.currentFeature.setStyle(props.styleControl.style);
        self.currentFeature = feature;
        self.currentFeature.setStyle(styleControl.style);
      } else if (feature) {
        self.currentFeature = feature;
        self.currentFeature.setStyle(styleControl.style);
      } else if (self.currentFeature) {
        const props = self.currentFeature.getProperties();

        if (props?.styleControl?.style) self.currentFeature.setStyle(props.styleControl.style);
        self.currentFeature = undefined;
      }
    },
    clearCurrentFeature() {
      self.currentFeature = undefined;
    },
    setStyle(color: string) {
      if (self.currentFeature) {
        const props = self.currentFeature.getProperties();
        (props.styleControl as StyleControl).setColor(color);
        props.styleControl.addStyle();
        self.currentFeature.setStyle(props.styleControl.style);
      }
    },
  };
}).create({});

export default FeatureManager;
