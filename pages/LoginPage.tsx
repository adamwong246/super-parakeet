import React, { useState } from "react";

// https://stackoverflow.com/a/46181/614612
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


export default function LoginPage() {
  const [state, setState] = useState<{
    password: string;
    email: string;
    page: 'login' | 'home';
    credentialError: boolean;
    emailError: boolean;
  }>({
    password: "password",
    email: "example@mail.com",
    page: 'login',
    credentialError: false,
    emailError: false
  });


  return <div>


    {/* <pre>{JSON.stringify(state)}</pre> */}

    {
      state.page === "login" &&
      <div>

        <h2>Welcome back!</h2>
        <p>Sign in and get to it.</p>

        <form>
          <input type="email" value={state.email} onChange={(e) => {
            setState({
              ...state,
              email: e.target.value,
              credentialError: false
            })
          }} />

          {
            state.emailError && <p>Something isn’t right. Please double check your email format.</p>
          }

          <input type="password" value={state.password} onChange={(e) => {
            setState({
              ...state,
              password: e.target.value,
              credentialError: false
            })
          }} />

          {
            state.credentialError && <p>You entered an incorrect email, password, or both.</p>
          }

          <br />

          <button disabled={state.password === "" || state.email === ""} onClick={(event) => {

            event.preventDefault();

            const isValidEmail = validateEmail(state.email);

            if (!isValidEmail) {
              setState({
                ...state,
                emailError: true
              });
              return;
            }

            if (state.password === "password" && state.email === "alex@rockpapercoin.com") {
              setState({
                ...state,
                page: 'home'
              })
            } else {
              setState({
                ...state,
                credentialError: true
              })
            }

          }} >Sign In</button>
        </form>
      </div>
    }

    {
      state.page === "home" &&
      <div>
        Welcome to your home pages, {state.email}
      </div>
    }

  </div>
}