import styled from "styled-components";

const Style = styled.ul`
  z-index: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  list-style: none;
  padding: 0;

  > li {
    margin: 6px 0;
    padding: 6px 12px;
    background-color: #444444;
    border-radius: 20px;
    text-align: left;
    transition: 0.3s;
    cursor: pointer;
    &.active {
      background-color: #00e38f;
      color: #000;
    }
  }
`;

export default Style;
