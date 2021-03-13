import { isRange, transformRangeToQuery } from '../../utils/object'

const resolveQuery = query => {
  const resolvedFilter = query || {}
  const where = resolvedFilter.where || {}
  const props = query.props || []

  const [attr, direction] = (query.orderBy || 'created DESC').split(' ')

  const orderBy = `${direction === 'DESC' ? '-' : '+'}${attr}`
  const limit = query.limit || 30
  const offset = query.offset || 0

  Object.keys(where).forEach(key => {
    if (isRange(where[key])) {
      where[key] = transformRangeToQuery(where[key])
    }
  })

  return { where, orderBy, limit, offset, props }
}

export default resolveQuery