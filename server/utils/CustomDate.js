const moment = require('moment');

class CustomDate {

  static currentTime() {
    return new Date().toTimeString().slice(0, 8);
  }

  static dateAndTime() { // eg.: 2020-1-9 9:8:7.6
    let date = new Date();

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
  }

  static timezonedTime() {
    return moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  }
}

module.exports = CustomDate;