// This file is for testing implementations of types supplied by the "redux-toolkit" package.
// It's purpose is to test reselect Selectors backed by a redux Store

import assert from "assert";
import { Store, AnyAction, Slice, Reducer } from "@reduxjs/toolkit";

import { Given, When, Then, Suite } from "../testeranto/reduxToolkit";

import core, { IStoreState as IState } from "../app";
import { ILoginPageSelection } from "../pages/LoginPage";

const selector = core.select.loginPageSelection;
const actions = core.app.actions;
type IStore = Store<IState, AnyAction>;

const ReduxToolkitSuite = (
  description: string,
  reducer: Reducer<IState, AnyAction>,
  givens: Given<IState, IStore, ILoginPageSelection>[]
) => new Suite(
  description,
  reducer,
  givens
);

const GivenAnEmptyState = (
  feature: string,
  whens: When<IState, IStore>[],
  thens: Then<ILoginPageSelection, IStore>[]
) => new Given(
  `the state is empty`,
  whens,
  thens,
  core.app.getInitialState(),
  feature
);

const GivenAStateWithEmail = (
  feature: string,
  email: string,
  whens: When<IState, IStore>[],
  thens: Then<ILoginPageSelection, IStore>[]
) => new Given(
  `the email is already ${email}`,
  whens,
  thens,
  {
    ...core.app.getInitialState(),
    email
  },
  feature
);
const WhenTheLoginIsSubmitted = () =>
  new When(`the login form is submitted`, actions.signIn);
const WhenTheEmailIsSetTo = (email: string) =>
  new When(`the email is set to "${email}"`, actions.setEmail, email);
const WhenThePasswordIsSetTo = (password: string) =>
  new When(`the password is set to "${password}"`, actions.setPassword, password);

const ThenTheEmailIs = (email: string) =>
  new Then(`the email is "${email}"`, selector, (selection) =>
    assert.equal(selection.email, email)
  );
const ThenTheEmailIsNot = (email: string) =>
  new Then(`the email is not "${email}"`, selector, (selection) =>
    assert.notEqual(selection.email, email)
  );
const ThenThereIsAnEmailError = () =>
  new Then(`there should be an email error`, selector, (selection) =>
    assert.equal(selection.error, 'invalidEmail')
  );
const ThenThereIsNotAnEmailError = () =>
  new Then(`there should not be an email error`, selector, (selection) =>
    assert.notEqual(selection.error, 'invalidEmail')
  );
const ThenTheSubmitButtonShouldBeEnabled = () =>
  new Then(`the submit button should be enabled`, selector, (selection) =>
    assert(!selection.disableSubmit)
  );
const ThenTheSubmitButtonShouldNotBeEnabled = () =>
  new Then(`the submit button should not be enabled`, selector, (selection) =>
    assert(selection.disableSubmit)
  );
const ThenThePasswordIs = (password: string) =>
  new Then(`the password is "${password}"`, selector, (selection) =>
    assert.equal(selection.password, password)
  )
function ThenThePasswordIsNot(password: string) {
  return new Then(`the password is not "${password}"`, selector, (selection) => {
    assert.notEqual(selection.password, password);
  })
};

const suite = ReduxToolkitSuite('testing redux store + reselect selectors', core.app.reducer, [
  GivenAnEmptyState(`Set the email and check the email`, [
    WhenTheEmailIsSetTo("adam@email.com"),
  ], [
    ThenTheEmailIs("adam@email.com"),
  ]),

  GivenAStateWithEmail(`Set the email by initial state, then set the email normally, and then check some other stuff`, "wade@rpc", [
    WhenTheEmailIsSetTo("adam@email.com"),
    WhenThePasswordIsSetTo("secret"),
  ], [
    ThenTheEmailIsNot("wade@rpc"),
    ThenThePasswordIs("secret"),
    ThenThePasswordIsNot("idk"),
  ]),


  GivenAnEmptyState("Don't show an email error just because the email does not validate", [
    WhenTheEmailIsSetTo("adam")
  ], [
    ThenThereIsNotAnEmailError()
  ]),

  GivenAnEmptyState(`Put some data in both fields to enable the submit button. Email does not need to be valid!`, [
    WhenTheEmailIsSetTo("adam"),
    WhenThePasswordIsSetTo("adam"),
  ], [
    ThenTheSubmitButtonShouldBeEnabled()
  ]),


  GivenAnEmptyState(`Don't enable the submit button if password is blank`, [
    WhenTheEmailIsSetTo("adam"),
    WhenThePasswordIsSetTo(""),
  ], [
    ThenTheSubmitButtonShouldNotBeEnabled()
  ]),


  GivenAnEmptyState(`Don't enable the submit button if email is blank`, [
    WhenTheEmailIsSetTo(""),
    WhenThePasswordIsSetTo("something"),
  ], [
    ThenTheSubmitButtonShouldNotBeEnabled()
  ]),


  GivenAnEmptyState(`Don't enable the submit button if you haven't entered a password`, [
    WhenTheEmailIsSetTo("adam")
  ], [
    ThenTheSubmitButtonShouldNotBeEnabled()
  ]),


  GivenAnEmptyState(`Don't enable the submit button if you haven't entered an email`, [
    WhenThePasswordIsSetTo("something"),
  ], [
    ThenTheSubmitButtonShouldNotBeEnabled()
  ]),

  GivenAnEmptyState(`Check for email validations only after you've pressed the submit button 1/2`, [
    WhenTheEmailIsSetTo("adam"),
  ], [
    ThenThereIsNotAnEmailError(),
    ThenTheSubmitButtonShouldNotBeEnabled()
  ]),

  GivenAnEmptyState(`Check for email validations only after you've pressed the submit button 2/2`, [
    WhenTheEmailIsSetTo("adam"),
    WhenThePasswordIsSetTo("adam"),
    WhenTheLoginIsSubmitted()
  ], [
    ThenThereIsAnEmailError(),
    ThenTheSubmitButtonShouldBeEnabled()
  ]),


]);

export default () => {
  suite.run();
}