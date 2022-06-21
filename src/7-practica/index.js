import * as cp from "child_process";

const child = cp.fork("./src/7-practica/child.js");

const arr = [0, 1, 2, 3, 5, 7, 11, 13];

arr.forEach((seed) => {
  child.send({ seed: seed });
});
