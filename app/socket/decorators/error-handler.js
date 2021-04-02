import { decoratePrototype } from '../../utils/object'
import errorHandlerDecorator from '../../utils/decorators/error-handler'

export function ErrorHandler(Clazz) {
  decoratePrototype(errorHandlerDecorator, Clazz)
}