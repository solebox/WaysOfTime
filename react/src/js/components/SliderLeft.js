import React from "react";

import Title from "./Slider/Title";
import { fetchThumbs } from "../actions/thumbActions";

import { connect } from "react-redux";
import Thumbnail from "./Slider/Thumbnail";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    
  }
    
    


  render() {
    const SliderLeftVisibleState = this.props.gui.SliderLeftVisible ? "active" : "";

    const { thumbs_list } = this.props.thumbs;
    const mapped_thumbs = thumbs_list.map((thumbnail) => {
        if (!thumbnail.selected){
          return <Thumbnail key={thumbnail.id} map_id={thumbnail.id} map_url={thumbnail.url} 
                    map_title={thumbnail.title} />;
        }
      }
    );
    return (
      <div id="slider" class={"mdl-layout__drawer"+" "+SliderLeftVisibleState}>
          <header> 
              <span class="mdl-layout-title">
                  <a href="/">
                      <img id="mainLogo" src="../static/img/mapabazman-logo-v1.png"></img>

                  </a>
              </span>
              <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect layer-button-info" data-dialog="dialog">
                  <span class="material-icons">info</span>
              </button>
              <div class="mdl-grid">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                      <input id="fixed-search" class="mdl-textfield__input" name="searchInput" type="text"></input>
                      <label class="mdl-textfield__label" for="fixed-search">Type Something...</label>
                  </div>
                  <div id="search" class="mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet">
                      <a id="search-more" href="#">More options</a>
                      <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Search</button>
                  </div>
              </div>
          </header>
          <div id="search">
              <ul id="thumb" >
                      { mapped_thumbs }
              </ul>
          </div>
      </div>
    );
  }
}
