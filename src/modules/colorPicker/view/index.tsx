import Style from "./style";
import { useEffect, useState } from "preact/compat";
import FeatureManager from "../../featureManager/viewModel";
import ColorPickerStore from "../viewModel";
import { observer } from "mobx-react-lite";

const StylePicker = observer((): JSX.Element => {
  const [color, setColor] = useState<string>("#fff");

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!FeatureManager.currentFeature) ColorPickerStore.handleOpen(false);
    });
  }, []);

  return (
    <Style
      className={ColorPickerStore.open ? "open" : ""}
      color={color}
      onChange={(color) => {
        setColor(color.hex);
        FeatureManager.setStyle(color.hex);
      }}
    />
  );
});

export default StylePicker;
