//Thumbnail.js
import { connect } from "react-redux";
import React from 'react';
import CardMenu from './CardMenu';
import { addLayer } from "../../actions/layerActions";
import { toggleThumbSelection } from "../../actions/thumbActions";
import { toggleInfoModal } from "../../actions/guiActions";


@connect((store) => {
  return {
    thumbs: store.thumbs,
  }
})
export default class Thumbnail extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);


  }

  thumbSelected(map_id)  {
    this.props.dispatch(toggleThumbSelection(map_id));
    this.props.dispatch(addLayer(map_id));

  }

  toggleInfo(map_id) {
    this.props.dispatch(toggleInfoModal(map_id));
  }


  render() {
  	const { map_id, map_url, map_title, controls_visible } = this.props;

    const bindee = controls_visible ? null : this
  
    const slider_class = controls_visible ? "mdl-slider mdl-js-slider" : "invisible"
    return (
      <li onClick={this.thumbSelected.bind(bindee, map_id)} class='thumbnail-click' id={"map-" + map_id } >
	    	<div class='demo-card-image mdl-card mdl-shadow--2dp'>
		        <CardMenu map_id={map_id} controls_visible={controls_visible} thumbSelectedToggle={this.thumbSelected.bind(this)}
                    toggleInfoModal={this.toggleInfo.bind(this, map_id)}/>
		        <img src={ map_url } data-id={ map_id } />
		        <div class='mdl-card__actions' >
		            <span class='demo-card-image__filename'>{ map_title }</span>
		            <input class={slider_class+" thumb-slider"} type="range" min="0" max="100" value="100" tabindex="0" />
		        </div>
	        </div>
	     </li>
    );
  }
}
