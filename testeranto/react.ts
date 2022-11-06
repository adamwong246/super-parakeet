import renderer, { act, ReactTestRenderer } from 'react-test-renderer';

export class Suite<IElement extends () => JSX.Element> {
  name: string;
  givens: Given[];
  element: IElement;
  constructor(
    name: string,
    givens: Given[],
    element: IElement,
  ) {
    this.name = name;
    this.givens = givens;
    this.element = element;
  }

  run() {
    console.log("\nSuite:", this.name)
    this.givens.forEach((given) => {
      given.run(this.element);
    })
  }
}

export class Given {
  name: string;
  whens: When[];
  thens: Then[];
  initialProps: any;
  feature: string;
  constructor(
    name: string,
    whens: When[],
    thens: Then[],
    initialProps: any,
    feature: string,
  ) {
    this.name = name;
    this.whens = whens;
    this.thens = thens;
    this.initialProps = initialProps;
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

export class When {
  name: string;
  action: (component: renderer.ReactTestRenderer) => void;
  constructor(
    name: string,
    action: (component: renderer.ReactTestRenderer) => void,

  ) {
    this.name = name;
    this.action = action;
  }

  run(component: ReactTestRenderer) {
    console.log(" When:", this.name)
    act(() => this.action(component));

  }
};

export class Then {
  name: string;
  assertion: (component: renderer.ReactTestRenderer) => any;
  constructor(
    name: string,
    assertion: (component: renderer.ReactTestRenderer) => any,
  ) {
    this.name = name;
    this.assertion = assertion;
  }

  run(component: ReactTestRenderer) {
    console.log(" Then:", this.name)
    this.assertion(component);
  }
};
