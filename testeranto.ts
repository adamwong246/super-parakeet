import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, AnyAction, Reducer, Selector, Store } from "@reduxjs/toolkit";
import { createStore } from "redux";

type IState = any;  //{ value: any };
type IReducer = any; //Reducer<{ value: any; }, AnyAction>;
type IStore = Store<IState, AnyAction>;
type IActionCreate = ActionCreatorWithoutPayload<string> | ActionCreatorWithPayload<any, string>;

export class Suite {
  name: string;
  givens: Given[];
  reducer: IReducer;
  constructor(name: string, givens: Given[], reducer: IReducer) {
    this.name = name;
    this.givens = givens;
    this.reducer = reducer;
  }

  run() {
    console.log("Suite", this.name)
    this.givens.forEach((g) => {
      g.run(this.reducer);
    })
  }
}

export class Given {
  name: string;
  whens: When[];
  thens: Then<any>[];
  initialValues: IState;
  constructor(name: string, whens: When[], thens: Then<any>[], initialValues: IState) {
    this.name = name;
    this.whens = whens;
    this.thens = thens;
    this.initialValues = initialValues;

  }

  run(reducer: IReducer) {
    console.log("- Given", this.name)
    const store = createStore<IState, any, any, any>(reducer, this.initialValues);

    this.whens.forEach((when) => {
      when.run(store);
    });

    this.thens.forEach((then) => {
      then.run(store);
    });
  }
}

export class When {
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
    console.log("-- When", this.name)
    store.dispatch(this.actionCreator(this.payload))
  }
};

export class Then<T> {
  name: string;
  selector: Selector<any, T>;
  callback: (val: T) => void;

  constructor(
    name: string,
    selector: Selector<any, T>,
    callback: (val: T) => void
  ) {
    this.name = name;
    this.selector = selector;
    this.callback = callback;
  }

  run(store: IStore) {
    console.log("--- Then", this.name)
    this.callback(this.selector(store.getState()))
  }
};
