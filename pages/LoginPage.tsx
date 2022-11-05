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

function LoginPage() {

  const selection = useSelector(selector);

  return <div>
    <h2>Welcome back!</h2>
    <p>Sign in and get to it.</p>

    <form>
      <input type="email" value={selection.email} onChange={(e) => store.dispatch(actions.setEmail(e.target.value))} />

      <p>
        {selection.error === 'invalidEmail' && "Something isn’t right. Please double check your email format"}
      </p>

      <br />

      <input type="password" value={selection.password} onChange={(e) => store.dispatch(actions.setPassword(e.target.value))} />

      <p>
        {selection.error === 'credentialFail' && "You entered an incorrect email, password, or both."}
      </p>

      <br />

      <button disabled={selection.disableSubmit} onClick={(event) => { event.preventDefault(); }} >Sign In</button>

    </form>

  </div>
}

export default function () {
  return <Provider store={store}>
    <LoginPage />
  </Provider>
}