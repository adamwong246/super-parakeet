import { createSelector, createSlice, createStore, Store, combineReducers, ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

import { ILoginPageError, ILoginPageSelection } from "./pages/LoginPage";

export type IStoreState = {
  password: string;
  email: string;
};

export const loginApp = createSlice<IStoreState, {
  setPassword: (a, b) => void,
  setEmail: (a, b) => void,
}>({
  name: "login app",
  initialState: {
    password: "",
    email: "",
  },
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
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
  if (storeState.password === "password" && storeState.email === "adam@email.com") {
    return 'credentialFail';
  }
  return;
};

const loginPageSelection = createSelector<[(IStoreState) => any], ILoginPageSelection>([selectRoot], (root: IStoreState) => {
  return {
    ...root,
    error: checkForErrors(root),
    disableSubmit: root.email == "" && root.password == ""
  }
});

export default {
  app: loginApp,
  select: {
    loginPageSelection
  },
  store,
};

