import { render } from "preact";
import { App } from "./app/app";
import "./index.css";
import "ol/ol.css";

render(<App />, document.getElementById("app")!);
