
import assert from "assert";

import { Given, When, Then, Suite } from "./testeranto";

import core from "./app";
import { ILoginPageSelection } from "./pages/LoginPage";

const selector = core.select.loginPageSelection;
const actions = core.app.actions;
const store = core.store;

const GivenAnEmptyState = (whens: When[], thens: Then<ILoginPageSelection>[]) => new Given(
  `The state is emptuy`,
  whens, thens,
  core.app.getInitialState()
);

const GivenAStateWithEmail = (email: string, whens: When[], thens: Then<ILoginPageSelection>[]) => new Given(
  `The email is already ${email}`,
  whens, thens,
  {
    email,
    password: ""
  }
);

const WhenTheEmailIsSetTo = (email: string) => new When(`the email is set to ${email}`, actions.setEmail, email);
const ThenTheEmailIs = (email: string) => new Then<ILoginPageSelection>(`The email is ${email}`, selector, (selection) => {
  assert.equal(selection.email, email);
});
const ThenTheEmailIsNot = (email: string) => new Then<ILoginPageSelection>(`The email is not ${email}`, selector, (selection) => {
  assert.notEqual(selection.email, email);
});
const ThenThereIsNotAnEmailError = () => new Then<ILoginPageSelection>(`there should not be an email error`, selector, (selection) => {
  assert.notEqual(selection.error, 'invalidEmail');
});

new Suite('my first test suite', [
  GivenAnEmptyState([
    WhenTheEmailIsSetTo("adam@email.com"),
  ], [
    ThenTheEmailIs("adam@email.com"),
  ]),

  GivenAStateWithEmail("wade@rpc", [
    WhenTheEmailIsSetTo("adam@email.com"),
  ], [
    ThenTheEmailIsNot("wade@rpc"),
  ]),


  // GivenAnEmptyState([
  //   WhenTheEmailIsSetTo("adam"),
  // ], [
  //   ThenThereIsNotAnEmailError()
  // ]),


], core.app.reducer).run();

console.log("tests are done!")