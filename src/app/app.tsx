import Map from "../modules/map/view";
import Tool from "../modules/tools/view";
import ContextMenu from "../modules/contextmenu/view";
import mapControlInit from "../modules/map/viewModel";
import StylePicker from "../modules/colorPicker/view";
import LayerSwitch from "../modules/layerSwitch/view";
import SaveLoad from "../modules/saveLoad/view";

mapControlInit();

export function App() {
  return (
    <>
      <Map />
      <Tool />
      <ContextMenu />
      <StylePicker />
      <LayerSwitch />
      <SaveLoad />
    </>
  );
}
