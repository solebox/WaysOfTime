import React from "react";
import Thumbnail from "./Slider/Thumbnail";

export default class DrawerRight extends React.Component {
  render() {
  	const { thumbs_list } = this.props.thumbs;
  	var slider_active = false;
    const mapped_thumbs = thumbs_list.map((thumbnail) => {
        if (thumbnail.selected){
          slider_active = true;
          return <Thumbnail key={thumbnail.id} map_id={thumbnail.id} map_url={thumbnail.url} 
                    map_title={thumbnail.title} />;
        }
      }
    );
    var slider_active_class = slider_active ? "active" : "";
    return (
      <div class={"mdl-layout__drawer-right " + slider_active_class}>
              <div id="layers_slider">
                  <ul id="sortable">{ mapped_thumbs }</ul> 
              </div>
      </div>
    );
  }
}
