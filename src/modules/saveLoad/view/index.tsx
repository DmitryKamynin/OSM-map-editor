import Styles from "./styles";

import vectorSource from "../../map/modules/vectorSource/model";
import { useCallback } from "preact/compat";
import { LineString, Polygon } from "ol/geom";
import { Feature } from "ol";
import StyleControl from "../../colorPicker/model";

const SaveLoad = (): JSX.Element => {
  const saveAll = useCallback(() => {
    const features = vectorSource.getFeatures();
    const data: any = [];

    features.forEach((feature) => {
      feature.setProperties({ saved: true });
      const geom = feature.getGeometry() as Polygon | LineString;
      data.push({
        coords: geom.getCoordinates(),
        type: geom.getType(),
        color: feature.getProperties().styleControl.color,
      });
    });

    const dataString = JSON.stringify(data);
    localStorage.setItem("features", dataString);

    const file = new Blob([dataString], { type: "utf-8" });
    const url = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.href = url;
    a.download = "geo data";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  }, []);

  const loadFile = useCallback(({ target }: Event) => {
    if (target instanceof HTMLInputElement && target.files?.length) {
      try {
        const fileReader = new FileReader();
        fileReader.readAsText(target.files[0], "utf-8");
        fileReader.onload = () => {
          let storage = JSON.parse(fileReader.result as string) ?? [];
          vectorSource.refresh();

          storage.forEach((item: any) => {
            const geometry = item.type === "Polygon" ? new Polygon(item.coords) : new LineString(item.coords);
            const feature = new Feature({
              geometry,
            });
            const styleControl = new StyleControl(item.color);
            styleControl.addStyle();
            feature.setProperties({ styleControl });
            feature.setStyle(styleControl.style);

            vectorSource.addFeature(feature);

            localStorage.setItem("features", fileReader.result as string);
          });
        };
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <Styles>
      <button onClick={saveAll}>Save</button>
      <label htmlFor="fileLoad">Load</label>

      <input id="fileLoad" type="file" onInput={loadFile} />
    </Styles>
  );
};

export default SaveLoad;
