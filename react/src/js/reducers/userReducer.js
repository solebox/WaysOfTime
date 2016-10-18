//userReducer.js
export default function reducer(state={},action){
	switch (action.type){
		case "bla":{}
		case "bla2": {
			return {
				...state,
				key1: value1,
				key2: value2,
				key3: action.payload,
				key4: value4 + action.payload,
			}
		}
	}
	return state;
}