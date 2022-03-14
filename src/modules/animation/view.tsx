import styled from "styled-components";
import store from "./viewModel";
import { observer } from "mobx-react-lite";
import Store from "./viewModel";

const Style = styled.div`
  position: absolute;
  top: 120px;
  left: 20px;

  button {
    margin: 6px 0;
    padding: 6px 12px;
    background-color: #444444;
    border: 0;
    color: #fff;
    border-radius: 20px;
    text-align: left;
    transition: 0.1s;
    cursor: pointer;
    margin-right: 5px;
    :active {
      background-color: #00e38f;
      color: #000;
    }
  }
`;

const speed = [1, 2, 3];

const Anim = observer(
  (): JSX.Element => (
    <Style>
      {/*<button*/}
      {/*  type="button"*/}
      {/*  onClick={() => {*/}
      {/*    if (!Store.road.length) {*/}
      {/*      store.reset();*/}
      {/*      store.startMove();*/}
      {/*    } else {*/}
      {/*      if (Store.runAnimation) {*/}
      {/*        store.stopMove();*/}
      {/*      } else {*/}
      {/*        store.startMove();*/}
      {/*      }*/}
      {/*    }*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {!Store.road.length ? "Начать сначала" : Store.runAnimation ? "Остановить анимацию" : "Запустить анимацию"}*/}
      {/*</button>*/}
      {/*<div>*/}
      {/*  {speed.map((speed) => (*/}
      {/*    <button*/}
      {/*      type="button"*/}
      {/*      onClick={() => {*/}
      {/*        store.setRunSpeed(speed);*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      X{speed}*/}
      {/*    </button>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </Style>
  )
);

export default Anim;
