import styled from "styled-components";

const Style = styled.div`
  position: absolute;
  display: none;
  background-color: #444444;
  > button {
    display: block;
    width: 100%;
    padding: 6px 12px;
    background-color: transparent;
    border: none;
    outline: none;
    transition: 0.1s;
    color: #fff;
    :hover {
      background-color: #5d5d5d;
    }

    :active {
      color: #000;
      background-color: #00e38f;
    }
  }

  &.open {
    display: block;
  }
`;

export default Style;
