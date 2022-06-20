import * as fs from "fs";

const scriptFile = process.argv[1];
const fileContent = fs.readFileSync(scriptFile);
// console.log(`fileContent: `);
// console.log(fileContent);
// console.log(`toString: `);
// console.log(fileContent.toString());

function printFile(err, fileContent) {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`Data: ${fileContent}`);
  }
}

fs.readFile(scriptFile, printFile);

function onWriteEnd() {
  console.log("Archivo copiado");
}

function copyFile(err, fileContent) {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    fs.writeFile(`${scriptFile}.copy.txt`, fileContent, onWriteEnd);
  }
}

fs.readFile(scriptFile, copyFile);
