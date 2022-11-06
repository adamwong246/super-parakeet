
import assert from "assert";

import { Given, When, Then, Suite } from "./testeranto";

import core from "./app";
import { ILoginPageSelection } from "./pages/LoginPage";

const selector = core.select.loginPageSelection;
const actions = core.app.actions;
const store = core.store;

const GivenAnEmptyState = (whens: When[], thens: Then<ILoginPageSelection>[]) => new Given(
  `the state is empty`,
  whens, thens,
  core.app.getInitialState()
);

const GivenAStateWithEmail = (email: string, whens: When[], thens: Then<ILoginPageSelection>[]) => new Given(
  `the email is already ${email}`,
  whens, thens,
  {
    email,
    password: ""
  }
);

const WhenTheEmailIsSetTo = (email: string) => new When(`the email is set to "${email}"`, actions.setEmail, email);
const WhenThePasswordIsSetTo = (password: string) => new When(`the password is set to "${password}"`, actions.setPassword, password);

const ThenTheEmailIs = (email: string) => new Then<ILoginPageSelection>(`the email is "${email}"`, selector, (selection) => {
  assert.equal(selection.email, email);
});
const ThenTheEmailIsNot = (email: string) => new Then<ILoginPageSelection>(`the email is not "${email}"`, selector, (selection) => {
  assert.notEqual(selection.email, email);
});
const ThenThereIsAnEmailError = () => new Then<ILoginPageSelection>(`there should be an email error`, selector, (selection) => {
  assert.equal(selection.error, 'invalidEmail');
});
const ThenThereIsNotAnEmailError = () => new Then<ILoginPageSelection>(`there should not be an email error`, selector, (selection) => {
  assert.notEqual(selection.error, 'invalidEmail');
});
const ThenTheSubmitButtonShouldBeEnabled = () => new Then<ILoginPageSelection>(`the submit button should be enabled`, selector, (selection) => {
  assert(!selection.disableSubmit);
});
const ThenTheSubmitButtonShouldNotBeEnabled = () => new Then<ILoginPageSelection>(`the submit button should not be enabled`, selector, (selection) => {
  assert(selection.disableSubmit);
});
const ThenThePasswordIs = (password: string) => new Then<ILoginPageSelection>(`the password is "${password}"`, selector, (selection) => {
  assert.equal(selection.password, password);
});
function ThenThePasswordIsNot(password: string) {
  return new Then<ILoginPageSelection>(`the password is not "${password}"`, selector, (selection) => {
    assert.notEqual(selection.password, password);
  })
};

const WhenTheLoginIsSubmitted = () => new When(`the login form is submitted`, actions.signIn);

new Suite('testing the Login App', [
  GivenAnEmptyState([
    WhenTheEmailIsSetTo("adam@email.com"),
  ], [
    ThenTheEmailIs("adam@email.com"),
  ]),

  GivenAStateWithEmail("wade@rpc", [
    WhenTheEmailIsSetTo("adam@email.com"),
    WhenThePasswordIsSetTo("secret"),
  ], [
    ThenTheEmailIsNot("wade@rpc"),
    ThenThePasswordIs("secret"),
    ThenThePasswordIsNot("idk"),
  ]),


  GivenAnEmptyState([
    WhenTheEmailIsSetTo("adam")
  ], [
    ThenThereIsNotAnEmailError()
  ]),

  GivenAnEmptyState([
    WhenTheEmailIsSetTo("adam"),
    WhenThePasswordIsSetTo("adam"),
  ], [
    ThenTheSubmitButtonShouldBeEnabled()
  ]),


  GivenAnEmptyState([
    WhenTheEmailIsSetTo("adam"),
    WhenThePasswordIsSetTo(""),
  ], [
    ThenTheSubmitButtonShouldNotBeEnabled()
  ]),


  GivenAnEmptyState([
    WhenTheEmailIsSetTo(""),
    WhenThePasswordIsSetTo("something"),
  ], [
    ThenTheSubmitButtonShouldNotBeEnabled()
  ]),


  GivenAnEmptyState([
    WhenTheEmailIsSetTo("adam")
  ], [
    ThenTheSubmitButtonShouldNotBeEnabled()
  ]),


  GivenAnEmptyState([
    WhenThePasswordIsSetTo("something"),
  ], [
    ThenTheSubmitButtonShouldNotBeEnabled()
  ]),

  GivenAnEmptyState([
    WhenTheEmailIsSetTo("adam"),
    WhenThePasswordIsSetTo("adam"),
    WhenTheLoginIsSubmitted()
  ], [
    ThenThereIsAnEmailError(),
    ThenTheSubmitButtonShouldBeEnabled()
  ]),


], core.app.reducer).run();

console.log("\ntests are done!\n")