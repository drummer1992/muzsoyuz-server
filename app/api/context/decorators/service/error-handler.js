import { decoratePrototype } from '../../../../utils/object'
import errorHandlerDecorator from '../error-handler'

export function ErrorHandler(Clazz) {
  decoratePrototype(errorHandlerDecorator, Clazz)
}