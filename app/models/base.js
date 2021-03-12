class BaseModel {
  fetch(props) {
    return this.constructor.findById(this._id, props)
  }
}

export default BaseModel
