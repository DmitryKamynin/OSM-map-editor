import Style from "./style";
import ToolsStore from "../viewModel";
import { ToolsModelType } from "../model";
import { observer } from "mobx-react-lite";

const tools: {
  title: string;
  tool: ToolsModelType["currentTool"];
}[] = [
  {
    title: "Polygon",
    tool: "polygon",
  },
  {
    title: "Line",
    tool: "line",
  },
];

const Tool = observer(
  (): JSX.Element => (
    <Style>
      {tools.map((item) => (
        <li
          onClick={() => {
            if (ToolsStore.currentTool !== item.tool) ToolsStore.setTool(item.tool);
            else ToolsStore.setTool("none");
          }}
          className={ToolsStore.currentTool === item.tool ? "active" : ""}
        >
          {item.title}
        </li>
      ))}
    </Style>
  )
);

export default Tool;
