# testeranto
## tightly-typed tests, with testeranto.ts

"testeranto" ( a pun based on the language "esperanto") is a bespoke Typescript testing framework. It is a way of specifing stateful logic, lifting that knowledge out of your codebase into a high-level cucumber-like specification. Testeranto is NOT for testing pure functions- is designed only to address only _stateful_ logic. At the moment, there are 3 type interfaces:

- testeranto<redux>
- testeranto<redux-toolkit> (redux store + reselect selectors)
- testeranto<react> (react-test-renderer)
- testeranto<Rectangle> (just a regular js class)

but there exists many more possibilities!

- testeranto<phantomjs>
- testeranto<http>
- testeranto<web3>
- testeranto<YOUR DB HERE>

Testeranto can be applied to _any_ JS class- See the Rectangle example!
