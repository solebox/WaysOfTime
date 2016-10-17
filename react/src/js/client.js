import { applyMiddleware, createStore } from "redux";
import axios from "axios";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";


const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);

