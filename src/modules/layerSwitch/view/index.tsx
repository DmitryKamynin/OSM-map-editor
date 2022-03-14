import Style from "./style";
import layerIcon from "../../../assets/98870.png";
import { map } from "../../map/view";
import { useState } from "preact/compat";

const LayerSwitch = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const layers = map.getLayers().getArray();
  const googleLayer = layers.slice(1, 2)[0];
  const customLayers = layers.slice(2, layers.length - 1);
  const polygonLayer = layers[layers.length - 1];

  return (
    <Style>
      <button type="button" className="icon" onClick={(): void => setOpen(!open)}>
        <img src={layerIcon} alt="" />{" "}
      </button>
      <div className={open ? "menu open" : "menu"}>
        <label className="layerBtn checkbox">
          Google
          <input
            type="checkbox"
            onChange={() => {
              googleLayer.setVisible(!googleLayer.getVisible());
            }}
            checked={!!googleLayer.getVisible()}
          />
        </label>
        {customLayers.map((layer) => (
          <>
            <button
              onClick={() => {
                customLayers.forEach((lay) => {
                  lay.setVisible(false);
                });
                layer.setVisible(true);
              }}
              type="button"
              className="layerBtn"
            >
              {layer.get("name")}
            </button>
          </>
        ))}
        <label className="layerBtn checkbox">
          {polygonLayer.get("name")}
          <input
            type="checkbox"
            onChange={() => {
              polygonLayer.setVisible(!polygonLayer.getVisible());
            }}
            checked={!!polygonLayer.getVisible()}
          />
        </label>
      </div>
    </Style>
  );
};

export default LayerSwitch;
