import { isRange, transformRangeToQuery } from '../../utils/object'

const resolveFilter = filter => {
  const resolvedFilter = filter || {}
  const where = resolvedFilter.where || {}

  const [attr, direction] = (filter.orderBy || 'created DESC').split(' ')

  const orderBy = `${direction === 'DESC' ? '-' : '+'}${attr}`
  const limit = filter.limit || 30
  const offset = filter.offset || 0

  Object.keys(where).forEach(key => {
    if (isRange(where[key])) {
      where[key] = transformRangeToQuery(where[key])
    }
  })

  return { where, orderBy, limit, offset }
}

export default resolveFilter