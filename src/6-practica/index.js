import * as fs from "fs/promises";

// readFile();

// async function readFile() {
//   const scriptFile = process.argv[1];
//   try {
//     const fileContent = await fs.readFile(scriptFile);
//     console.log(fileContent.toString());
//   } catch (err) {
//     console.log(`Error: ${err}`);
//   }
// }

const scriptFile = process.argv[1];
fs.readFile(scriptFile)
  .then(copyFile)
  .catch((err) => {
    console.log(`Error: ${err}` );
  })
  .finally(() => {
    console.log("Terminado");
  });

//Leer fichero y copiarlo

function onWriteEnd() {
  console.log("Archivo Copiado");
}

function copyFile(fileContent) {
  fs.writeFile(`${scriptFile}.copy.txt`, fileContent)
    .then(onWriteEnd)
    .catch((err) => console.log(`Error ${err}`))
    .finally(() => console.log("Acabouse"));
}
