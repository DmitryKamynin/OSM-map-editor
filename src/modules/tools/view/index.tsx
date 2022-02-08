import Style from "./style";
import ToolsStore from "../viewModel";
import { ToolsModelType } from "../model";
import { observer } from "mobx-react-lite";

const tools: {
  title: string;
  tool: ToolsModelType["currentTool"];
}[] = [
  {
    title: "Карандаш",
    tool: "pen",
  },
  {
    title: "Полигон",
    tool: "polygon",
  },
  {
    title: "Маршрут",
    tool: "line",
  },
  {
    title: "Редактирование",
    tool: "edit",
  },
  {
    title: "Выбор",
    tool: "choice",
  },
  {
    title: "Без инструмента",
    tool: "none",
  },
];

const Tool = observer(
  (): JSX.Element => (
    <Style>
      {tools.map((item) => (
        <li
          onClick={() => {
            ToolsStore.setTool(item.tool);
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
