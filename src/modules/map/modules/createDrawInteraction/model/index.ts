import { Draw } from "ol/interaction";
import StyleControl from "../../../../colorPicker/model";
import vectorSource from "../../vectorSource/model";
import { Feature } from "ol";

const createDraw = (type: "LineString" | "Polygon", freehand?: boolean) => {
  const draw = new Draw({
    type,
    freehand,
    source: vectorSource,
    condition: (e) => {
      if (e.originalEvent instanceof PointerEvent) {
        return e.originalEvent.buttons === 1;
      }
      return false;
    },
    style: new StyleControl().style,
  });

  draw.on("drawend", ({ feature }) => {
    if (feature instanceof Feature) {
      const styleControl = new StyleControl();
      // Сохраняю стиль для конкретной фичи, чтобы он хранился в ней, а не в векторном слое
      feature.setStyle(styleControl.style);

      // Сохраняю объект класса, styleControl в пропсах фичи, чтобы можно было манипулировать её стилем в будущем в FeatureManager
      feature.setProperties({
        styleControl,
      });
    }
  });

  return draw;
};

export default createDraw;
