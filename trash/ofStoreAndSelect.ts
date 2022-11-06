// export abstract class TesterantoSuite<
//   IStore,
//   ISelected,
// > {
//   name: string;
//   subject: IStore;
//   givens: TesterantoGiven<IStore, ISelected>[];

//   constructor(
//     name: string,
//     subject: IStore,
//     givens: TesterantoGiven<IStore, ISelected>[],

//   ) {
//     this.name = name;
//     this.subject = subject;
//     this.givens = givens;
//   }

//   run() {
//     console.log("\nSuite:", this.name)
//     this.givens.forEach((g) => {
//       g.run(this.subject);
//     })
//   }
// }

// export abstract class TesterantoGiven<
//   IStore,
//   ISelected,
// > {
//   name: string;
//   whens: TesterantoWhen<IStore>[];
//   thens: TesterantoThen<ISelected>[];
//   feature: string;
//   constructor(
//     name: string,
//     whens: TesterantoWhen<IStore>[],
//     thens: TesterantoThen<ISelected>[],
//     feature: string
//   ) {
//     this.name = name;
//     this.whens = whens;
//     this.thens = thens;
//     this.feature = feature;
//   }

//   // abstract initialValues: any;
//   abstract given(subject): any;

//   run(subject: any) {
//     console.log(`\n - ${this.feature} - \n\nGiven: ${this.name}`)
//     const store = this.given(subject);

//     this.whens.forEach((when) => {
//       when.run(store);
//     });

//     this.thens.forEach((then) => {
//       then.run(store);
//     });
//   }

// }

// export abstract class TesterantoWhen<
//   IStore,
// > {
//   name: string;
//   actionCreator: (x: any) => any;
//   payload: object;
//   constructor(
//     name: string,
//     actionCreator: (x) => any,
//     payload: any = {}
//   ) {
//     this.name = name;
//     this.actionCreator = actionCreator;
//     this.payload = payload;
//   }

//   abstract when(store: IStore, action: any): any;

//   run(store: IStore) {
//     console.log(" When:", this.name);
//     this.when(
//       store,
//       this.actionCreator(this.payload)
//     )
//   }
// };

// export abstract class TesterantoThen<
//   ISelected,
// > {
//   name: string;
//   callback: (storeState: ISelected) => any;

//   constructor(
//     name: string,
//     callback: (val: ISelected) => any
//   ) {
//     this.name = name;
//     this.callback = callback;
//   }

//   abstract then(store: any): ISelected;

//   run(store: any) {
//     console.log(" Then:", this.name)
//     this.callback(this.then(store))
//   }
// };
