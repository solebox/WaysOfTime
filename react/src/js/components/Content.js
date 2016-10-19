/**
 * Created by sole on 9/29/16.
 */
import React from "react";


export default class Content extends React.Component {
    constructor() {
        super();
    };

    render() {
        return (

            <div class="container">
                   <div id="map"></div>
                  <div id="layers"> 
                      <div id="chosenLayers" class="mdl-layout--fixed-drawer">
                          <div class="mdl-layout__drawer">
                              <nav class="mdl-navigation"></nav>
                              <div id="layers_slider">
                                  <ul id="sortable"></ul>
                              </div>
                          </div>
                          <div class="content">
                              <div class="page-content"></div>
                          </div>
                      </div>
                  </div>

              </div>
        );
    }
}
