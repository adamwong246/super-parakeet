import ReactDom from "react-dom";
import React from "react";

const ReactRoot = () =>
  <p>hello world</p>

document.addEventListener("DOMContentLoaded", (event) =>
  ReactDom.render(<ReactRoot />, document.getElementById("root")));
