import resolveFilter from '../../../user/resolve-filter'

const findOffers = (filter) => {
  const query = resolveFilter(filter)

  return Offer.find(query.where)
    .sort(query.orderBy)
    .limit(query.limit)
    .skip(query.offset)
}

export default findOffers