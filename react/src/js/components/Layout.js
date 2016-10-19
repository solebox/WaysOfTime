import React from "react";
import SliderLeft from './SliderLeft';
import SliderRight from "./SliderRight";
import Content from "./Content";
import { connect } from "react-redux";
import { fetchThumbs } from "../actions/thumbActions";
import { toggleSliderLeft } from "../actions/guiActions";

@connect((store) => {
  return {
    user: store.user,
    thumbs: store.thumbs,
    gui: store.gui,
  }
})
export default class Layout extends React.Component {
  constructor() {
    super();
  }
  
  componentWillMount() {
    this.props.dispatch(fetchThumbs());
  }

  toggleSliderLeft(){
      this.props.dispatch(toggleSliderLeft());
  }
  /* need to find an original way to move burger button into its component and fixing the mdl issues*/
  render() {
    return (
          <div class="demo-layout-transparent mdl-layout mdl-js-layout">
              <SliderLeft thumbs={this.props.thumbs} gui={this.props.gui}/>
              <SliderRight thumbs={this.props.thumbs} />
              <Content />
              <div onClick={this.toggleSliderLeft.bind(this)} class="mdl-layout__drawer-button">
                <i class="material-icons"></i>
              </div>
          </div>
    );
  }
}
