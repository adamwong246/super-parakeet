
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, AnyAction, PreloadedState, Reducer, Selector, Store } from "@reduxjs/toolkit";
import { createStore } from "redux";

type IActionCreate = ActionCreatorWithoutPayload<string> | ActionCreatorWithPayload<any, string>;

export class Suite<
  IState,
  IReducer extends Reducer<IState, AnyAction>,
  IStore extends Store<IState, AnyAction>,
  ISelected
> {
  name: string;
  reducer: IReducer;
  givens: Given<IState, IStore, ISelected>[];
  constructor(
    name: string,
    reducer: IReducer,
    givens: Given<IState, IStore, ISelected>[],

  ) {
    this.name = name;
    this.reducer = reducer;
    this.givens = givens;
  }

  run() {
    console.log("\nSuite:", this.name)
    this.givens.forEach((g) => {
      g.run(this.reducer);
    })
  }
}

export class Given<
  IState,
  IStore extends Store<IState, AnyAction>,
  ISelected
> {
  name: string;
  whens: When<IState, IStore>[];
  thens: Then<ISelected, IStore>[];
  initialValues: PreloadedState<IState>;
  feature: string;
  constructor(
    name: string,
    whens: When<IState, IStore>[],
    thens: Then<ISelected, IStore>[],
    initialValues: PreloadedState<IState>,
    feature: string
  ) {
    this.name = name;
    this.whens = whens;
    this.thens = thens;
    this.initialValues = initialValues;
    this.feature = feature;
  }

  run(reducer: Reducer) {
    console.log(`\n - ${this.feature} - \n\nGiven: ${this.name}`)
    const store = createStore<IState, any, any, any>(reducer, this.initialValues);

    this.whens.forEach((when) => {
      when.run(store);
    });

    this.thens.forEach((then) => {
      then.run(store);
    });
  }
}

export class When<
  IState,
  IStore extends Store<IState, AnyAction>
> {
  name: string;
  actionCreator: IActionCreate;
  payload: object;
  constructor(
    name: string,
    actionCreator: IActionCreate,
    payload: any = {}
  ) {
    this.name = name;
    this.actionCreator = actionCreator;
    this.payload = payload;
  }

  run(store: IStore) {
    console.log(" When:", this.name)
    store.dispatch(this.actionCreator(this.payload))
  }
};

export class Then<
  ISelected,
  IStore extends Store<any, AnyAction>
> {
  name: string;
  selector: Selector<any, ISelected>;
  callback: (val: ISelected) => void;

  constructor(
    name: string,
    selector: Selector<any, ISelected>,
    callback: (val: ISelected) => void
  ) {
    this.name = name;
    this.selector = selector;
    this.callback = callback;
  }

  run(store: IStore) {
    console.log(" Then:", this.name)
    this.callback(this.selector(store.getState()))
  }
};
