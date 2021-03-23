class EventContext {
  #user

  constructor(socket, userId) {
    this.socket = socket
    this.#user = new User({ _id: userId })
  }

  get user() {
    return this.#user
  }

  getCurrentUserId() {
    return this.#user?._id
  }
}

export default EventContext