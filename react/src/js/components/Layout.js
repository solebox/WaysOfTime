import React from "react";
import SliderLeft from './SliderLeft';
import SliderRight from "./SliderRight";
import Content from "./Content";
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
  
  componentWillMount() {
    this.props.dispatch(fetchThumbs());
  }

  render() {
    return (
          <div class="demo-layout-transparent mdl-layout mdl-js-layout">
              <SliderLeft thumbs={this.props.thumbs} />
              <SliderRight thumbs={this.props.thumbs} />
              <Content />
          </div>
    );
  }
}
