console.log("child strarted working");

process.send({ msg: "I am a child working" });

process.on("message", (arg) => {
  if (arg.msg) {
    console.log(`Recived from parent ${arg.msg}`);
  }
  if (arg.close) {
    console.log("parent make me close");
    process.exit(1);
  }
});
