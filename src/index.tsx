import ReactDom from "react-dom";
import React from "react";

import LoginPage from "../pages/LoginPage";


document.addEventListener("DOMContentLoaded", async (event) => {
  await ReactDom.render(<LoginPage />, document.getElementById("root"));
});

