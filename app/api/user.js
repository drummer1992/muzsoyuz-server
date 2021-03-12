import Context from './context'
import { Service } from './context/decorators/service'
import { AuthGuard } from './context/decorators/guards/auth-guard'
import { Delete, Get, Post, Put } from './context/decorators/endpoint'
import updateProfile from '../workflows/api/user/profile/update'
import createOffer from '../workflows/api/user/offers/create'
import updateOffer from '../workflows/api/user/offers/update'
import { StatusCode as c } from '../constants/http'
import { StatusCode } from './context/decorators/status-code'
import { ValidationPipe } from '../errors/validation/decorator'
import { CreateOfferSchema, FindOffersSchema, UpdateOfferSchema } from '../workflows/api/user/offers/schema'
import { UpdateUserSchema } from '../workflows/api/user/profile/schema'
import findOffers from '../workflows/api/user/offers/find'
import deleteOffer from '../workflows/api/user/offers/delete'
import { Logger } from './context/decorators/logger'
import createDayOff from '../workflows/api/user/day-off/create'
import { CreateDayOffSchema } from '../workflows/api/user/day-off/schema'
import deleteDayOff from '../workflows/api/user/day-off/delete'
import getDaysOff from '../workflows/api/user/day-off/get'

@Logger
@Service('/user')
class UserService extends Context {
  @Get()
  @AuthGuard
  getProfile() {
    return this.getCurrentUser().fetch()
  }

  @Put()
  @AuthGuard
  @ValidationPipe(UpdateUserSchema)
  updateProfile(changes) {
    return updateProfile(this.getCurrentUserId(), changes)
  }

  @Post('/offers')
  @AuthGuard
  @ValidationPipe(CreateOfferSchema)
  @StatusCode(c.CREATED)
  createOffer(payload) {
    return createOffer(this.getCurrentUserId(), payload)
  }

  @Put('/offers/{offerId}')
  @AuthGuard
  @ValidationPipe(UpdateOfferSchema)
  updateOffer(changes) {
    const { offerId } = this.request.pathParams

    return updateOffer(this.getCurrentUserId(), offerId, changes)
  }

  @Post('/offers/find')
  @ValidationPipe(FindOffersSchema, { required: false })
  findOffers(filter) {
    return findOffers(filter)
  }

  @Delete('/offers/{offerId}')
  @AuthGuard
  @StatusCode(c.NO_CONTENT)
  deleteOffer() {
    const { offerId } = this.request.pathParams

    return deleteOffer(this.getCurrentUserId(), offerId)
  }

  @Get('/daysOff')
  @AuthGuard
  getDaysOff() {
    return getDaysOff(this.getCurrentUserId())
  }

  @Post('/daysOff')
  @AuthGuard
  @ValidationPipe(CreateDayOffSchema)
  @StatusCode(c.CREATED)
  createDayOff(payload) {
    return createDayOff(this.getCurrentUserId(), payload)
  }

  @Delete('/daysOff/{dayOffId}')
  @AuthGuard
  @StatusCode(c.NO_CONTENT)
  deleteDayOff() {
    const { dayOffId } = this.request.pathParams

    return deleteDayOff(this.getCurrentUserId(), dayOffId)
  }
}

module.exports = UserService
