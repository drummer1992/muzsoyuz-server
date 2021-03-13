import { Request } from '../../app/utils/http/request'
import { ENV } from '../../app/config'

export class MuzsoyuzApi extends Request {
  static user = {
    findOffers: query => this.post(`${ENV.TEST_URL}/user/offers/find`, query),
  }
}