const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

const mongooseConnect = function () {
  mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log("[MONGO] New MongoDB Instance has been initialized.");
  });
};

mongoose.Promise = Promise;

mongoose.connection.on("error", function () {
  mongoose.disconnect();
});

mongoose.connection.on("disconnected", function () {
  setTimeout(mongooseConnect, 10240);
});

mongooseConnect();
