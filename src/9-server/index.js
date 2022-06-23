import * as http from "http";
import * as fs from "fs/promises";

const PORT = 8000;
// const BASE_URL = "C:/Users/IGM000108/Desktop/igmlabs/blr-node-astro-bookings/src";
const BASE_URL = "./src";
// const BASE_URL = __dirname;
const OK = 200;
const NOT_FOUND = 404;
const server = http.createServer();

server.on("request", processRequest);

async function processRequest(requestStream, responseStream) {
  let url = BASE_URL + requestStream.url;
  try {
    const fileContent = await fs.readFile(url);
    writeResponseOk(fileContent);
    await writePipe({ fileContent, url: requestStream.url });
  } catch (error) {
    writeResponseError(error);
  } finally {
    responseStream.end();
  }

  function writeResponseError(error) {
    responseStream.writeHead(NOT_FOUND, { "Content-type": "text/plain" });
    responseStream.write(buildMessageNotOk(requestStream.url, error));
  }

  function writeResponseOk(fileContent) {
    responseStream.writeHead(OK, { "Content-type": "text/plain" });
    responseStream.write(buildMessageOk(requestStream.url, fileContent));
  }
}

server.listen(PORT, () => {
  console.log("server listening");
});

function buildMessageOk(url, fileContent) {
  let message = "";
  message += "Arquive Found:  \n";
  message += url;
  message += "\n";
  message += fileContent;
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

async function writePipe(urlContent) {
  if (!urlContent.url || !urlContent.fileContent) {
    throw new Error("No url or no data");
  }
  let archiveName = urlContent.url.split("/");
  let finalArchiveName = archiveName.join(".");
  await fs.writeFile(finalArchiveName, urlContent.fileContent);
  //   let writeStream = fs.createWriteStream("./src/9-server/" + finalArchiveName);
  //   writeStream.write(fileContent);
  //   writeStream.close();
}
