import resolveQuery from '../../../user/resolve-query'

const findOffers = query => {
  const resolvedQuery = resolveQuery(query)

  return Offer.find(resolvedQuery.where, resolvedQuery.props)
    .sort(resolvedQuery.orderBy)
    .limit(resolvedQuery.limit)
    .skip(resolvedQuery.offset)
}

export default findOffers