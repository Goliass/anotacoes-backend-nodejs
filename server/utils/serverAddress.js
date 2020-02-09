function serverAddress(request='') {
  let address = "";

  if (request && request.protocol && request.headers && request.headers.host) {
    address = `${request.protocol}://${request.headers.host}`
  }

  return address;
}

module.exports = serverAddress;