//CardMenu.js
import React from 'react';

export default class CardMenu extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
  	const { map_id } = this.props;
    return (
      <div class="invisible mdl-card__menu">
				    <button class="show-info mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
				            id={"map-info-" + map_id } data-id={ map_id }>
				        <i class="material-icons">info</i>
				    </button>
				    <button id={"delete-map-" + map_id } class="delete mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
				            data-id={ map_id }>
				        <i class="material-icons">clear</i>
				    </button>
				     <button id={"inspect-map-" + map_id } class="inspect mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
				            data-id={"nspect-map-" + map_id }>
				        <i class="material-icons">send</i>
				    </button>
				    <button id={"zoom-map-" + map_id}  class="zoom-map mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
				            data-id={"nspect-map-" +  map_id }>
				        <i class="material-icons">gps_fixed</i>
				    </button>
		</div>
    );
  }
}
