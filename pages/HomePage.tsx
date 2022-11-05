import React from "react";
import { Provider, useSelector } from "react-redux";

import core from "../app";

const selector = core.select.loginPageSelection;
const actions = core.app.actions;
const store = core.store;

export type ILoginPageError = 'invalidEmail' | `credentialFail` | void;

export type ILoginPageSelection = {
  password: string;
  email: string;
  error: ILoginPageError;
  disableSubmit: boolean;
};

function HomePage() {

  const selection = useSelector(selector);

  return <div>
    <h2>Welcome home</h2>

    <pre>
      {
        JSON.stringify(selection, null, 2)
      }
    </pre>
  </div>
}

export default function () {
  return <Provider store={store}>
    <HomePage />
  </Provider>
}