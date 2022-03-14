import styled from "styled-components";
import { SketchPicker } from "react-color";

const Style = styled(SketchPicker)`
  position: absolute;
  display: none;

  &.open {
    display: block;
    right: 0;
    bottom: 0;
  }
`;

export default Style;
