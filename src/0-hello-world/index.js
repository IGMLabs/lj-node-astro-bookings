//const saludos = require('./lib.js);
// import * as saludos from "./lib.js";
import { empresa, getGreetings } from "./lib.js";

const greetings = getGreetings(empresa);

// const greetings = saludos.getGreetings(saludos.empresa);
console.log(greetings);
