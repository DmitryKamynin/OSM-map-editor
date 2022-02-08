import FeatureManagerModel from "../model";
import { Feature } from "ol";
import { Geometry, LineString, Polygon } from "ol/geom";
import { Fill, Stroke, Style } from "ol/style";
import StyleControl from "../../colorPicker/model";
import vectorSource from "../../map/modules/vectorSource/model";

const color = "#15a626";
const style = new Style({
  fill: new Fill({
    color: color + "22",
  }),
  stroke: new Stroke({
    width: 2,
    lineDash: [10],
    color: color,
  }),
});

const FeatureManager = FeatureManagerModel.actions((self) => {
  // отрисовка сохранёных фич
  self.storage.forEach((item) => {
    const geom =
      item.type === "Polygon"
        ? new Polygon(item.coords)
        : new LineString(item.coords);
    const feature = new Feature({
      geometry: geom,
    });

    const styleControl = new StyleControl(item.color);

    feature.setProperties({ saved: true, styleControl });
    feature.setStyle(styleControl.style);

    vectorSource.addFeature(feature);
  });

  return {
    removeFromLocalStorage(feature: Feature<Geometry>) {
      const geom = feature.getGeometry() as Polygon | LineString;
      const idx = self.storage.find(
        (item) => item.coords === geom.getCoordinates()
      );
      if (idx !== -1) {
        feature.setProperties({ saved: false });
        self.storage.splice(idx, 1);
        localStorage.setItem("features", JSON.stringify(self.storage));
      }
    },
    saveToLocalStorage(feature: Feature<Geometry>) {
      feature.setProperties({ saved: true });
      const geom = feature.getGeometry() as Polygon | LineString;
      const data = {
        coords: geom.getCoordinates(),
        type: geom.getType(),
        color: feature.getProperties().styleControl.color,
      };
      self.storage.push(data);

      localStorage.setItem("features", JSON.stringify(self.storage));
    },

    // Логика по выбору текущей фичи
    setCurrentFeature(feature?: Feature<Geometry>) {
      if (feature && self.currentFeature && feature !== self.currentFeature) {
        const props = self.currentFeature.getProperties();

        self.currentFeature.setStyle(props.styleControl.style);
        self.currentFeature = feature;
        self.currentFeature.setStyle(style);
      } else if (feature) {
        self.currentFeature = feature;
        self.currentFeature.setStyle(style);
      } else if (self.currentFeature) {
        const props = self.currentFeature.getProperties();

        self.currentFeature.setStyle(props.styleControl.style);
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
        self.currentFeature.setStyle(props.styleControl.style);
        if (props.saved) {
          this.removeFromLocalStorage(self.currentFeature);
          this.saveToLocalStorage(self.currentFeature);
        }
      }
    },
  };
}).create({});

export default FeatureManager;
