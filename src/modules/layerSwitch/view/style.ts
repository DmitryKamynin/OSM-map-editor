import styled from "styled-components";

const Style = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: hidden;
  .icon {
    margin-top: 10px;
    margin-right: 10px;
    border: 0;
    box-sizing: content-box;
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
    background-color: #5d5d5d;
    padding: 10px;
    border-radius: 10px;
    transition: 0.1s;
    cursor: pointer;

    :hover {
      background-color: #fff;
    }

    :active {
      background-color: #5d5d5d;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  .menu {
    position: relative;
    right: calc(-100% - 10px);
    background-color: #5d5d5d;
    border-radius: 6px;
    overflow: hidden;
    transition: 0.3s;
    margin-right: 10px;

    &.open {
      right: 0;
    }

    .checkbox {
      display: flex !important;
      align-items: center;
      justify-content: center;
      > input {
      }
    }

    .layerBtn {
      display: block;
      width: 100%;
      padding: 12px 6px;
      background-color: #5d5d5d;
      border: none;
      color: #fff;
      font-weight: 600;
      transition: 0.2s;
      font-size: 14px;
      :hover {
        background-color: #fff;
        color: #000;
      }

      :active {
        background-color: #00e38f;
      }
    }
  }
`;

export default Style;
