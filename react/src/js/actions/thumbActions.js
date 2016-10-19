//thumbActions.js
import axios from "axios";

export function fetchThumbs(){
	return (dispatch) => {
		const data = [{"upload_file_name": "alice.jpg", "id": 1, "url": "http://localhost:3000/uploads/1/thumb/alice.png", "title": "first"}, {"upload_file_name": "babyj.png", "id": 2, "url": "http://localhost:3000/uploads/2/thumb/babyj.png", "title": "second"}, {"upload_file_name": "kest.png", "id": 3, "url": "http://localhost:3000/uploads/3/thumb/kest.png", "title": "third"}, {"upload_file_name": "telp.png", "id": 4, "url": "http://localhost:3000/uploads/4/thumb/telp.png", "title": "fourth"}]
		dispatch({type: "FETCH_THUMBS_FULFILLED", payload: data});
			
	}
}

export function toggleThumbSelection(id){
	return (dispatch) => {
		dispatch({type: "TOGGLE_THUMB_SELECTION",payload: id});
	}
}