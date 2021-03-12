export function Service(name) {
  return function(Clazz) {
    Clazz.serviceRegExp = new RegExp(name)
  }
}