import React from "react";
import Slider from './Slider';
import DrawerRight from "./DrawerRight";
import Content from "./Content";


export default class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
          <div class="demo-layout-transparent mdl-layout mdl-js-layout">
              <Slider />
              <DrawerRight />
              <Content />
          </div>
    );
  }
}
