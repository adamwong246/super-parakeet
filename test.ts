import Rectangle from "./src/Rectangle.test";
import redux from "./src/LoginStore.test";
import reduxToolkit from "./src/LoginSelector.test";
import react from "./src/LoginPage.test";

Rectangle();
redux();
reduxToolkit();
react();

console.log("\nAll the tests are done!")