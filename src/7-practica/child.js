import * as fs from "fs/promises";

console.log("child strarted working");

process.on("message", (arg) => {
  calcular(arg.seed);
});

async function calcular(seed) {
  let texto = "" + seed;
  let iteracion = seed;
  const scriptFile = process.argv[1];

  while (iteracion !== 1) {
    if (iteracion === 0) {
      texto = "error";
      break;
    }
    if (iteracion % 2 === 0) {
      iteracion = iteracion / 2;
      texto += " " + iteracion;
    } else {
      iteracion = iteracion * 3 + 1;
      texto += " " + iteracion;
    }
  }

  await fs.writeFile(`${scriptFile}.${seed}.txt`, texto);

  process.exit();
}
