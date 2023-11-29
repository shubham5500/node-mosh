var url = "http://mylogger.io/log";
const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    // raised an event
    this.emit(
      "messageLogged",
      { id: 1, url: "http://", message } /* this is called an event argument */
    );
  }
}

module.exports = {
  Logger,
};
