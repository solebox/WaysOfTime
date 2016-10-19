//thumbsReducer.js
import _ from "lodash";
export default function reducer(state={ thumbs_list: [], error: null}, action){
	switch (action.type){

		case "FETCH_THUMBS_FULFILLED":{
			const thumbs = {...state, thumbs_list: action.payload};
			thumbs.thumbs_list = _.map(thumbs.thumbs_list, (result) => {result.selected = false; return result;});
			return {
				...state,
				thumbs_list: thumbs.thumbs_list,
			}
		}
		case "FETCH_THUMBS_REJECTED": {
			return {
				...state,
				error: action.payload,
			}
		}
		case "TOGGLE_THUMB_SELECTION" : {
			const id_to_toggle = action.payload;
			const {thumbs_list}  = state;
			const list = _.map(thumbs_list, (thumbnail) => {
					thumbnail.selected = thumbnail.id == id_to_toggle ? !thumbnail.selected : thumbnail.selected; 
					return thumbnail;
				}
			);
			return {
				...state, 
				thumbs_list: list,
			}
		}
	}
	return state;
}