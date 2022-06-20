const twoSeconds = 2000;
let contador = 0;
const contadorMax = 4;

const id = setInterval(newFunction(), twoSeconds);

function newFunction() {
  return () => {
    console.log(`Hello ${contador}`);
    contador++;
    if (contador === contadorMax) {
      clearInterval(id);
    }
  };
}
