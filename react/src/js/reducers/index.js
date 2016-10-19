//index.js
import { combineReducers } from "redux"

import thumbs from "./thumbsReducer"
import layers from "./layersReducer"
import tweets from "./tweetsReducer"
import user from "./userReducer"
import gui from "./guiReducer"
export default combineReducers({
	thumbs,
	layers,
	tweets,
	user,
	gui,
});