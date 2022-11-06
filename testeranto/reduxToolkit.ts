
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, AnyAction, PreloadedState, Reducer, Selector, Store } from "@reduxjs/toolkit";
import { createStore } from "redux";

import { TesterantoGiven, TesterantoSuite, TesterantoThen, TesterantoWhen } from "./index";

type IActionCreate = ActionCreatorWithoutPayload<string> | ActionCreatorWithPayload<any, string>;

export class Suite<
  IStore,
  ISelected,
> extends TesterantoSuite<IStore, ISelected> {
}

export class Given<
  IState,
  IStore extends Store<IState, AnyAction>,
  ISelected,
> extends TesterantoGiven<
  IStore,
  ISelected
> {
  constructor(
    name: string,
    whens: When<IState, IStore>[],
    thens: Then<IState, ISelected, IStore>[],
    feature: string,
    initialValues: PreloadedState<IState>,
  ) {
    super(name, whens, thens, feature);
    this.initialValues = initialValues;
  }

  initialValues: PreloadedState<IState>;

  given(subject) {
    return createStore<IState, any, any, any>(subject, this.initialValues)
  }

}

export class When<
  IState,
  IStore extends Store<IState, AnyAction>
> extends TesterantoWhen<IStore> {

  actionCreator: IActionCreate;

  when(store: IStore, action: AnyAction) {
    store.dispatch(action);
  }

  constructor(
    name: string,
    actionCreator: IActionCreate,
    payload: any = {}
  ) {
    super(name, actionCreator, payload);
    this.actionCreator = actionCreator;
  }

};

export class Then<
  IState,
  ISelected,
  IStore extends Store<IState, AnyAction>
> extends TesterantoThen<ISelected> {

  selector: Selector<IState, ISelected>;

  constructor(
    name: string,
    callback: (val: ISelected) => any,
    selector: Selector<IState, ISelected>,

  ) {
    super(name, callback);
    this.selector = selector
  }

  then(store: IStore): ISelected {
    return this.selector(store.getState());
  }

};
