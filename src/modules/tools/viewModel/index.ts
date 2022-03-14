import ToolsModel, { ToolsModelType } from "../model";

import { map } from "../../map/view";

import createDrawInteraction from "../../map/modules/createDrawInteraction/model";
import modify from "../../map/modules/modify/model";

const ToolsStore = ToolsModel.actions((self) => {
  return {
    setTool(tool: ToolsModelType["currentTool"]): void {
      if (self.lastDraw) map.removeInteraction(self.lastDraw);
      map.removeInteraction(modify);

      self.currentTool = tool;
      switch (tool) {
        case "polygon":
          map.addInteraction(modify);
          self.lastDraw = createDrawInteraction("Polygon");
          break;
        case "line":
          map.addInteraction(modify);
          self.lastDraw = createDrawInteraction("LineString");
          break;
        default:
          self.lastDraw = undefined;
      }
      if (self.lastDraw) map.addInteraction(self.lastDraw);
    },
  };
}).create({
  currentTool: "none",
});

export default ToolsStore;
