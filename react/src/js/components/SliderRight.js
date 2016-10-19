import React from "react";
import Thumbnail from "./Slider/Thumbnail";

export default class DrawerRight extends React.Component {
  render() {
  	const { thumbs_list } = this.props.thumbs;
  	const right_slider_classes = ["mdl-layout__drawer-right"]; 
  	var slider_active = false;
    const mapped_thumbs = thumbs_list.map((thumbnail) => {
        if (thumbnail.selected){
          slider_active = true;
          return <Thumbnail key={thumbnail.id} map_id={thumbnail.id} map_url={thumbnail.url} 
                    map_title={thumbnail.title} />;
        }
      }
    );
    if (slider_active){
    	right_slider_classes.append("active");
    	console.log("right slider active");
    }
    return (
      <div class={right_slider_classes.join(" ")}>
              <div id="layers_slider">
                  <ul id="sortable">{ mapped_thumbs }</ul> 
              </div>
      </div>
    );
  }
}
