import * as fs from "fs/promises";

console.log("child strarted working");

process.on("message", (arg) => {
  try {
    calcular(arg.seed);
  } catch (error) {
    console.log(error);
    process.send({ msg: " Error en el hijo ", err: error.message, seed: arg.seed });
    process.exit();
  }
});

function calcular(seed) {
  let parse = parseInt(seed);
  let texto = "" + seed;
  let iteracion = seed;
  const scriptFile = process.argv[1];
  const startTime = process.hrtime();
  if (!parse && seed !== 0) {
    throw new Error(" No es un numero ");
  }
  while (iteracion !== 1) {
    if (iteracion < 1) {
      texto = " error ";
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
  const endTime = process.hrtime();
  texto += " Fecha inicio: " + startTime[1];
  texto += " Fecha fin: " + endTime[1];
  texto += " Tiemo transcurrido: " + (endTime[1] - startTime[1]);

  fs.writeFile(`${scriptFile}.${seed}.txt`, texto);
  process.exit();
}
