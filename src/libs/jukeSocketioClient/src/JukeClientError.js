export function JukeClientError (errCode, message) {
  this.errCode = errCode
  this.message = message
  this.stack = (new Error()).stack
}

JukeClientError.prototype = Object.create(Error.prototype)
