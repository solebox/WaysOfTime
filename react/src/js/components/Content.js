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
            <main class="mdl-layout__content">
                  <div id="map"></div>
                  <div id="layers"> 
                      <div id="chosenLayers" class="mdl-layout--fixed-drawer">
                          <div class="mdl-layout__drawer">
                              <nav class="mdl-navigation"></nav>
                              <div id="layers_slider">
                                  <ul id="sortable"></ul>
                              </div>
                          </div>
                          <main class="mdl-layout__content">
                              <div class="page-content"></div>
                          </main>
                      </div>
                  </div>
              </main>
        );
    }
}
