//thumbsReducer.js

export default function reducer(state={ thumbs: [], error: null}, action){
	switch (action.type){

		case "FETCH_THUMBS_FULFILLED":{
			return {
				...state,
				thumbs: [action.payload],
			}
		}
		case "FETCH_THUMBS_REJECTED": {
			return {
				...state,
				error: action.payload,
			}
		}
	}
	return state;
}