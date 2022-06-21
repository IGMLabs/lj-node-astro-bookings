import * as fs from "fs/promises";

console.log("child strarted working");

process.on("message", (arg) => {
  try {
    calcular(arg.seed);
  } catch (error) {
    console.log(error);
  }
});

async function calcular(seed) {
  let texto = "" + seed;
  let iteracion = seed;
  const scriptFile = process.argv[1];
  const start = new Date().getTime();

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
  const end = new Date().getTime();
  texto += " Fecha inicio: " + start;
  texto += " Fecha fin: " + end;
  texto += " Tiemo transcurrido" + (end - start);

  await fs.writeFile(`${scriptFile}.${seed}.txt`, texto);

  process.exit();
}
