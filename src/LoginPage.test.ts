// This file is for testing implementations of types supplied by the "react" package with the "react-test-renderer" package

import assert from "assert";

import { Given, When, Then, Suite } from "../trash/react2";

import LoginPage from "../pages/LoginPage";

const ReactSuite = (
  description: string,
  component: () => JSX.Element,
  givens: any[]
) => new Suite(description, component, givens);

const GivenAnEmptyState = (
  feature: string,
  whens: When<never, () => JSX.Element>[],
  thens: Then[]
) => new Given(
  `the state is empty`,
  whens,
  thens,
  feature
);

const GivenAStateWithEmail = (
  feature: string,
  email: string,
  whens: When<never, () => JSX.Element>[],
  thens: Then[]
) => new Given(
  `the email is already ${email}`,
  whens,
  thens,
  feature,
  {
    email,
    password: ""
  },
);

const WhenTheLoginIsSubmitted = () =>
  new When(`the login form is submitted`, (component) => component.root.findByType('button').props.onClick());

const WhenTheEmailIsSetTo = (email: string) =>
  new When(`the email is set to "${email}"`, (component) => {
    component.root.findByProps({ type: "email" }).props.onChange({ target: { value: email } });
  });
const WhenThePasswordIsSetTo = (password: string) =>
  new When(`the password is set to "${password}"`, (component) => {
    component.root.findByProps({ type: "password" }).props.onChange({ target: { value: password } });
  });

const ThenTheEmailIs = (email: string) =>
  new Then(`the email is "${email}"`, (component) => assert.equal(component.root.findByProps({ type: "email" }).props.value, email)
  );
const ThenTheEmailIsNot = (email: string) =>
  new Then(`the email is not "${email}"`, (component) =>
    assert.notEqual(component.root.findByProps({ type: "email" }).props.value, email)
  );

const ThenThePasswordIs = (password: string) =>
  new Then(`the password is "${password}"`, (component) => assert.equal(component.root.findByProps({ type: "password" }).props.value, password)
  );
const ThenThePasswordIsNot = (password: string) =>
  new Then(`the password is not "${password}"`, (component) =>
    assert.notEqual(component.root.findByProps({ type: "password" }).props.value, password)
  );

const ThenThereIsAnEmailError = () =>
  new Then(`there should be an email error`, (component) => {
    assert.equal(
      component.root.findByProps({ className: 'warning', id: 'invalid-email-warning' }).children.toString(),
      "Something isn’t right. Please double check your email format"
    )
  }
  );
const ThenThereIsNotAnEmailError = () =>
  new Then(`there should not be an email error`, (component) =>
    assert.notEqual(
      component.root.findByProps({ className: 'warning', id: 'invalid-email-warning' }).children.toString(),
      "Something isn’t right. Please double check your email format"
    )
  );


const suite = ReactSuite(`testing a function which returns a JSX.Element`, LoginPage, [

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
    ThenTheEmailIs("adam@email.com"),
    ThenThePasswordIs("secret"),
    ThenThePasswordIsNot("idk"),
  ]),

  GivenAnEmptyState("Don't show an email error just because the email does not validate", [
    WhenTheEmailIsSetTo("adam")
  ], [
    ThenThereIsNotAnEmailError()
  ]),

  GivenAnEmptyState("Do show an email error after submitting", [
    WhenTheEmailIsSetTo("adam"),
    WhenTheLoginIsSubmitted()
  ], [
    ThenThereIsAnEmailError()
  ]),


]);

export default () => {
  suite.run();
}