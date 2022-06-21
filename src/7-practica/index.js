import * as cp from "child_process";

const arr = [0, 1, 2, 3, 5, 7, 11, 13, 3424243523423424];

arr.forEach((seed) => {
  let child = cp.fork("./src/7-practica/child.js");
  child.send({ seed: seed });
});
