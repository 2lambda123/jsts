import Exception from '../lang/Exception.js'

export default class EmptyStackException extends Exception {
  constructor(message) {
    super(message)
    this.name = Object.keys({ EmptyStackException })[0]
  }
}
