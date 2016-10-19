//guiReducer.js

export default function reducer(state={ SliderLeftVisible: false }, action){
	switch (action.type){

		case "TOGGLE_SLIDER_LEFT":{
			
			return {
				...state,
				SliderLeftVisible: !state.SliderLeftVisible,
			}
		}
		case "moo": {
			return {
				...state,
				error: action.payload,
			}
		}
	
	}
	return state;
}