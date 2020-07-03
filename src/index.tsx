// use "* as" because it is .tsx file
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App";
import "./styles/style.scss";

//The Document's querySelector() method returns the first Element within the document that matches the specified selector or a group of selectors. If no matches are found, null is returned.
const ROOT = document.querySelector(".container");

ReactDOM.render(<App />, ROOT);
