import { Feature } from "ol";
import { Geometry } from "ol/geom";
import StyleControl from "../../colorPicker/model";

const setColor = (feature: Feature<Geometry>, color?: string) => {
  const styleControl = new StyleControl(color);
  styleControl.addStyle();
  feature.setStyle(styleControl.style);
  feature.setProperties({
    styleControl,
  });
};

export default setColor;
