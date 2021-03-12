import { decoratePrototype } from '../../../../utils/object'
import loggerDecorator from '../logger'

export function Logger(Clazz) {
  decoratePrototype(loggerDecorator, Clazz)
}