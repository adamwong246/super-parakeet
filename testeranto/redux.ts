
import { createStore, Reducer, Store, AnyAction, PreloadedState } from "redux";

export class Suite<
  IState,
  IReducer extends Reducer<IStore, AnyAction>,
  IStore extends Store<IState, AnyAction>,
> {
  name: string;
  givens: Given<IState, IStore>[];
  reducer: IReducer;
  constructor(name: string, givens: Given<IState, IStore>[], reducer: IReducer) {
    this.name = name;
    this.givens = givens;
    this.reducer = reducer;
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
  IStore extends Store<IState, AnyAction>
> {
  name: string;
  whens: When<IState, IStore>[];
  thens: Then<IState>[];
  initialValues: PreloadedState<IState>;
  feature: string;
  constructor(
    name: string,
    whens: When<IState, IStore>[],
    thens: Then<IState>[],
    initialValues: PreloadedState<IState>,
    feature: string
  ) {
    this.name = name;
    this.whens = whens;
    this.thens = thens;
    this.initialValues = initialValues;
    this.feature = feature;
  }

  run(reducer: (s, a) => any) {
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
  actionCreator: (x: any) => any;
  payload: object;
  constructor(
    name: string,
    actionCreator: (x) => any,
    payload: any = {}
  ) {
    this.name = name;
    this.actionCreator = actionCreator;
    this.payload = payload;
  }

  run(store: IStore) {
    console.log(" When:", this.name);
    const action: AnyAction = this.actionCreator(this.payload);
    store.dispatch(action);
  }
};

export class Then<
  IState,
> {
  name: string;
  callback: (storeState: IState) => void;

  constructor(
    name: string,
    callback: (val: IState) => void
  ) {
    this.name = name;
    this.callback = callback;
  }

  run(store: Store<IState, AnyAction>) {
    console.log(" Then:", this.name)
    this.callback(store.getState())
  }
};
