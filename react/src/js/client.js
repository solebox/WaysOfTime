import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import Layout from "./components/Layout";


const app = document.getElementById('app');
ReactDOM.render(<Provider store={store}>
		<Layout/>
	</Provider>, app);

