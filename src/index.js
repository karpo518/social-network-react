import React from "react";
import * as ReactDOM from 'react-dom/client'
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/redux-store";
import SamuraiJSApp from "./App";

const container = document.getElementById("root")

const root = ReactDOM.createRoot(container);

root.render(
    <SamuraiJSApp />
);


/*
store.subscribe(() => {
  let state = store.getState();
//  rerenderEntireTree(store);
});

*/

window.__store__ = store;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
