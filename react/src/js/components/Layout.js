import React from "react";
import Slider from './Slider';
import DrawerRight from "./DrawerRight";
import Content from "./Content";
import _$ from "jquery";
import { connect } from "react-redux";
import { fetchThumbs } from "../actions/thumbActions";

@connect((store) => {
  return {
    user: store.user,
    thumbs: store.thumbs
  }
})
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
