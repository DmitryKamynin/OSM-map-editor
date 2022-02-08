import ToolsModel, { ToolsModelType } from "../model";

import { map } from "../../map/view";

import createDrawInteraction from "../../map/modules/createDrawInteraction/model";
import modify from "../../map/modules/modify/model";

const ToolsStore = ToolsModel.actions((self) => ({
  setTool(tool: ToolsModelType["currentTool"]): void {
    if (self.lastDraw) map.removeInteraction(self.lastDraw);

    self.currentTool = tool;
    switch (tool) {
      case "polygon":
        self.lastDraw = createDrawInteraction("Polygon");
        break;
      case "line":
        self.lastDraw = createDrawInteraction("LineString");
        break;
      case "pen":
        self.lastDraw = createDrawInteraction("LineString", true);
        break;
      case "edit":
        self.lastDraw = modify;
        break;
      default:
        self.lastDraw = undefined;
    }
    if (self.lastDraw) map.addInteraction(self.lastDraw);
  },
})).create({
  currentTool: "none",
});

export default ToolsStore;
