import { createSelector, createSlice, createStore, Store, combineReducers, ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

import { ILoginPageError, ILoginPageSelection } from "./pages/LoginPage";

export type IStoreState = {
  password: string;
  email: string;
  error: ILoginPageError;
};

export const loginApp = createSlice<IStoreState, {
  setPassword: (s: IStoreState, b) => void,
  setEmail: (s: IStoreState, b) => void,
  signIn: (s: IStoreState) => void,
}>({
  name: "login app",
  initialState: {
    password: "",
    email: "",
    error: 'no_error'
  },
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    signIn: (state) => {
      state.error = checkForErrors(state)
    }
  },
});

const store = createStore(loginApp.reducer);

const selectRoot = ((storeState: IStoreState) => {
  return storeState;
});

// https://stackoverflow.com/a/46181/614612
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const checkForErrors = (storeState: IStoreState): ILoginPageError => {
  if (!validateEmail(storeState.email)) {
    return 'invalidEmail'
  }
  if (storeState.password !== "password" && storeState.email !== "adam@email.com") {
    return 'credentialFail';
  }
  return 'no_error';
};

const loginPageSelection = createSelector<[(IStoreState) => any], ILoginPageSelection>([selectRoot], (root: IStoreState) => {
  return {
    ...root,
    disableSubmit: root.email == "" || root.password == ""
  }
});

export default {
  app: loginApp,
  select: {
    loginPageSelection
  },
  store,
};

