const twoSeconds = 2000;

console.log("Before with inner function");
setTimeout(() => {
  console.log("Hello after 4 secs");
}, twoSeconds);

console.log("Before with inner function");
function printHello() {
  console.log("Hello");
  console.log("Goodbye");
}
setTimeout(printHello, twoSeconds);

console.log("Before with inner function");
const printHello2 = () => console.log("Hello 2 ");
setTimeout(printHello2, twoSeconds);

console.log("Before with inner function");
setTimeout(console.log("hello 4"), twoSeconds);

console.log("Before with parameters");
setTimeout((name) => console.log("hello " + name), twoSeconds, "IGM");

function sumar(a, b) {
  console.log(a + b);
}

setTimeout(sumar, twoSeconds, 3, 4);

const id = setInterval(() => console.log("Hello"), twoSeconds);
clearInterval(id);

console.log("After all this code");
