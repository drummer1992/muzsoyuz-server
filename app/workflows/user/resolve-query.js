import { isRange, transformRangeToQuery } from '../../utils/mongoose'
import { clone } from '../../utils/object'

const resolveQuery = query => {
  const clonedQuery = query ? clone(query) : {}
  const where = clonedQuery.where || {}
  const props = clonedQuery.props || []

  const [attr, direction] = (clonedQuery.orderBy || 'createdAt DESC').split(' ')

  const orderBy = `${direction === 'DESC' ? '-' : ''}${attr}`
  const limit = clonedQuery.limit || 30
  const offset = clonedQuery.offset || 0

  Object.keys(where).forEach(key => {
    if (isRange(where[key])) {
      where[key] = transformRangeToQuery(where[key])
    }
  })

  return { where, orderBy, limit, offset, props }
}

export default resolveQuery