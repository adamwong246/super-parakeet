import fs from "fs";
import assert from "assert";
import jsdom from "jsdom";

import 'global-jsdom/register'
// import { takeImage } from 'jsdom-to-image';
import { generateImage, setDefaultOptions } from "jsdom-screenshot";

const { JSDOM } = jsdom;

import { Given, When, Then, Suite } from "../testeranto/jsdom";

import ReactDom from "react-dom";
import React from "react";

import LoginPage from "../pages/LoginPage";

const data = fs.readFileSync('./dist/index.html', { encoding: 'utf8', flag: 'r' });
const dom = new JSDOM(data, {
  url: 'localhost:3000',
  resources: 'usable',
  runScripts: 'dangerously',
  pretendToBeVisual: true,

  beforeParse: (window) => {
    // let window = window;

  }
});

// allow
// global.window = dom.window;

export default () => {
  // console.log("Mark0", d om.window.document.body.outerHTML);

  // const document = dom.window.document;

  dom.window.document.addEventListener("DOMContentLoaded", async (event) => {
    console.log("DOMContentLoaded", dom.window.document.getElementById("root"));
    // await ReactDom.render(<LoginPage />, dom.window.document.getElementById("root"));



    console.log("Mark1", dom.window.document.body.outerHTML);
    const x = await generateImage()

    // console.log("mark3", x);
    await fs.writeFileSync("screenshot.png", x);
    console.log("mark4");
  });


  // dom.window.document.addEventListener('ReactLaunched', (e) => {
  //   console.log("ReactLaunched");
  //   // const x = dom.window.document.querySelector("html");
  //   // console.log(x ? x.outerHTML : "idk");
  // }, false);

  // dom.window.document.addEventListener("DOMContentLoaded", (event) => {
  //   console.log("DOMContentLoaded");
  //   // const x = dom.window.document.querySelector("html");
  //   // console.log(x ? x.outerHTML : "idk");
  // });


}