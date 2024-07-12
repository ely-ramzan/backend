const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);

    this.emit("messageLog", { id: 82383838, name: "ali" });
  }
}

module.exports = Logger;