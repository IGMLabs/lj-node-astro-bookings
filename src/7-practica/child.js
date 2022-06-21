import * as fs from "fs/promises";

console.log("child strarted working");

process.on("message", (arg) => {
  try {
    calcular(arg.seed);
  } catch (Error) {
    process.send({ msg: "Error en el hijo", err: Error });
    console.log(Error);
  }
});

async function calcular(seed) {
  let texto = "" + seed;
  let iteracion = seed;
  const scriptFile = process.argv[1];
  const start = process.hrtime();

  while (iteracion !== 1) {
    if (iteracion < 1) {
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
  const end = process.hrtime();
  texto += " Fecha inicio: " + start[1];
  texto += " Fecha fin: " + end[1];
  texto += " Tiemo transcurrido: " + (end[1] - start[1]);

  await fs.writeFile(`${scriptFile}.${seed}.txt`, texto);

  process.exit();
}
