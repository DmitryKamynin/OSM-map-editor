import styled from "styled-components";
import render from "preact-render-to-string";

const Style = styled.div`
  position: absolute;
  bottom: 20px;
  padding: 6px 12px;
  background-color: #fff;
  color: #000;
  font-weight: 700;
  border-radius: 12px;
`;

const AreaHintJsx = ({ meters }: { meters: string }): JSX.Element => {
  return (
    <Style>
      {meters}
      {"\u00A0"}m<sup>2</sup>
    </Style>
  );
};

const AreaHint = (meters: string): HTMLDivElement => {
  const template = document.createElement("template");
  template.innerHTML = render(AreaHintJsx({ meters }));
  return template.content.firstChild as HTMLDivElement;
};

export default AreaHint;
