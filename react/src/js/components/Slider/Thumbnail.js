//Thumbnail.js

import React from 'react';
import CardMenu from './CardMenu';
import { addLayer } from "../../actions/layerActions";

export default class Thumbnail extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e)  {
    e.preventDefault();
    console.log("clicked!!");
  }

  render() {
  	const { map_id, map_url, map_title } = this.props;
    return (
      <li class='thumbnail-click' id={"map-" + map_id } onClick={this.handleClick} >
	    	<div class='demo-card-image mdl-card mdl-shadow--2dp'>
		        <CardMenu map_id={map_id} />
		        <img src={ map_url } data-id={ map_id } onClick={this.handleClick} />
		        <div class='mdl-card__actions' >
		            <span class='demo-card-image__filename'>{ map_title }</span>
		            <input class="invisible thumb-slider" type="range" min="0" max="100" value="100" tabindex="0" />
		        </div>
	        </div>
	</li>
    );
  }
}
