import Context from './context'
import { Service } from './context/decorators/service'
import { AuthGuard } from './context/decorators/guards/auth-guard'
import { Delete, Get, Post, Put } from './context/decorators/endpoint'
import updateProfile from '../workflows/api/user/profile/update'
import createOffer from '../workflows/api/user/offers/create'
import updateOffer from '../workflows/api/user/offers/update'
import { StatusCode as c } from '../constants/http'
import { StatusCode } from './context/decorators/status-code'
import {
  BodyValidationPipe,
  PathParamsValidationPipe,
  QueryParamsValidationPipe,
} from './context/decorators/validation'
import { CreateOfferSchema, FindOffersSchema, UpdateOfferSchema } from '../workflows/api/user/offers/schema'
import { CreateDayOffSchema, DeleteDayOffSchema } from '../workflows/api/user/day-off/schema'
import {
  UpdateUserSchema,
  UploadImageSchema,
  UploadImageTransformationSchema,
} from '../workflows/api/user/profile/schema'
import findOffers from '../workflows/api/user/offers/find'
import deleteOffer from '../workflows/api/user/offers/delete'
import createDayOff from '../workflows/api/user/day-off/create'
import deleteDayOff from '../workflows/api/user/day-off/delete'
import getDaysOff from '../workflows/api/user/day-off/get'
import { UploadImagePipe } from './context/decorators/endpoint/upload'
import updateImageURL from '../workflows/user/profile/update-image-url'
import { QueryParamsTransformationPipe } from './context/decorators/transformation'

@Service('/user')
export default class UserService extends Context {
  @Get()
  @AuthGuard
  getProfile() {
    return this.getCurrentUser().fetch()
  }

  @Put()
  @AuthGuard
  @BodyValidationPipe(UpdateUserSchema)
  updateProfile() {
    return updateProfile(this.getCurrentUserId(), this.request.body)
  }

  @Post({ parseBody: false, path: '/uploadImage' })
  @AuthGuard
  @QueryParamsTransformationPipe(UploadImageTransformationSchema)
  @QueryParamsValidationPipe(UploadImageSchema)
  @UploadImagePipe({ directory: id => `/images/${id}/avatars` })
  @StatusCode(c.CREATED)
  uploadImage({ fileURL }) {
    return updateImageURL(this.getCurrentUserId(), fileURL)
  }

  @Post('/offers')
  @AuthGuard
  @BodyValidationPipe(CreateOfferSchema)
  @StatusCode(c.CREATED)
  createOffer() {
    return createOffer(this.getCurrentUserId(), this.request.body)
  }

  @Put('/offers/{offerId}')
  @AuthGuard
  @BodyValidationPipe(UpdateOfferSchema)
  updateOffer() {
    const { offerId } = this.request.pathParams

    return updateOffer(this.getCurrentUserId(), offerId, this.request.body)
  }

  @Post('/offers/find')
  @BodyValidationPipe(FindOffersSchema, { required: false })
  findOffers() {
    return findOffers(this.request.body)
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
  @BodyValidationPipe(CreateDayOffSchema)
  @StatusCode(c.CREATED)
  createDayOff() {
    return createDayOff(this.getCurrentUserId(), this.request.body)
  }

  @Delete('/daysOff/{dayOffId}')
  @AuthGuard
  @PathParamsValidationPipe(DeleteDayOffSchema)
  @StatusCode(c.NO_CONTENT)
  deleteDayOff() {
    const { dayOffId } = this.request.pathParams

    return deleteDayOff(this.getCurrentUserId(), dayOffId)
  }
}
