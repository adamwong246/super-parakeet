import renderer, { act, ReactTestRenderer } from 'react-test-renderer';

import { TesterantoSuite } from '../testeranto/index';

export class Suite<
  IElement extends () => JSX.Element,
  IState,
> extends TesterantoSuite<IState, IElement> {
}

export class Given<
  IState,
  IElement extends () => JSX.Element
> {
  name: string;
  whens: When<IState, IElement>[];
  thens: Then[];
  feature: string;
  initialValues: IState;
  constructor(
    name: string,
    whens: When<IState, IElement>[],
    thens: Then[],
    feature: string,
    initialValues: any = {}

  ) {
    this.name = name;
    this.whens = whens;
    this.thens = thens;
    this.initialValues = initialValues;
    this.feature = feature;
  }

  run(element: () => JSX.Element) {
    console.log("\nGiven:", this.name)
    let component;
    act(() => {
      component = renderer.create(element());
    });
    this.whens.forEach((when) => when.run(component));
    this.thens.forEach((then) => then.run(component));
  }
}

export class When<
  IState,
  IElement extends () => JSX.Element
> {
  name: string;
  actionCreator: (x: ReactTestRenderer) => any;
  payload: object;
  constructor(
    name: string,
    actionCreator: (x: ReactTestRenderer) => any,
    payload: any = {}
  ) {
    this.name = name;
    this.actionCreator = actionCreator;
    this.payload = payload;
  }

  run(component: ReactTestRenderer) {
    console.log(" When:", this.name)
    act(() => this.actionCreator(component));
  }
};

export class Then {
  name: string;
  callback: (storeState: ReactTestRenderer) => void;

  constructor(
    name: string,
    callback: (val: ReactTestRenderer) => void
  ) {
    this.name = name;
    this.callback = callback;
  }

  run(component: ReactTestRenderer) {
    console.log(" Then:", this.name)
    this.callback(component);
  }

};
