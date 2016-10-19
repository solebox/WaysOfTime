//layersReducer.js
export default function reducer(state={ layer_list: [], error: null}, action){
	switch (action.type){

		
		case "ADD_LAYER": {
			return {
				...state,
				layer_list: action.payload,
			}
		}
		
	}
	return state;
}