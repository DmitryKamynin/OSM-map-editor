import styled from "styled-components";

const Styles = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;

  > button,
  > label {
    border: none;
    padding: 6px 12px;
    font-size: 14px;
    background-color: #444444;
    border-radius: 12px;
    text-align: left;
    transition: 0.3s;
    cursor: pointer;
    margin-right: 10px;
    color: #fff;
    :active {
      background-color: #00e38f;
      color: #000;
    }
  }

  > input {
    display: none;
  }
`;

export default Styles;
