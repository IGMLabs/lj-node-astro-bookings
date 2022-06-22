import * as http from "http";
import * as fs from "fs";

const PORT = 8000;
const BASE_URL = "C:/Users/IGM000108/Desktop/igmlabs/blr-node-astro-bookings/src";
const LOCAL_HOST = "http://localhost:8000/";
const OK = 200;
const NOT_FOUND = 404;
const server = http.createServer();

server.on("request", async (requestStream, responseStream) => {
  let url = BASE_URL + requestStream.url;
  console.log(requestStream.url);
  await fs.readFile(url, (err, fileContent) => {
    processRequest(err, fileContent, requestStream, responseStream);
    let urlGet = LOCAL_HOST + requestStream.url;
    http.get(urlGet, writePipe);
  });
});

server.listen(PORT, () => {
  console.log("server listening");
});

function processRequest(err, fileContent, requestStream, responseStream) {
  if (err) {
    responseStream.writeHead(NOT_FOUND, { "Content-type": "text/plain" });
    responseStream.write(buildMessageNotOk(requestStream.url, err));
    responseStream.end();
  } else {
    responseStream.writeHead(OK, { "Content-type": "text/plain" });
    responseStream.write(buildMessageOk(requestStream.url, fileContent));
    responseStream.end();
  }
}

function buildMessageOk(url, fileContetn) {
  let message = "";
  message += "Hola mundo \n";
  message += url;
  message += "\n";
  message += fileContetn;
  return message;
}

function buildMessageNotOk(url, err) {
  let message = "";
  message += "Arquive not found \n";
  message += url;
  message += "\n";
  message += JSON.stringify(err);
  return message;
}

async function writePipe(responseStream) {
  let writeStream = fs.createWriteStream("www.google.com.html");
  await responseStream.pipe(writeStream);
  writeStream.close();
}
