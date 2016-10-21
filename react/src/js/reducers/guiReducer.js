//guiReducer.js

export default function reducer(state={ SliderLeftVisible: false, infoModalVisible: -1 }, action){
	switch (action.type){

		case "TOGGLE_SLIDER_LEFT":{
			
			return {
				...state,
				SliderLeftVisible: !state.SliderLeftVisible,
			}
		}
		case "TOGGLE_INFO_MODAL": {
			return {
				...state,
				infoModalVisible: action.payload,
			}
		}
	
	}
	return state;
}