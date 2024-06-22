import { IsNumber, IsString, Max, Min } from 'class-validator'
import { ReviewSwaggerDtoDecorators } from './swagger/review-swagger.dto'

export class ReviewDto {
	@IsNumber()
	@Min(1)
	@Max(5)
  @ReviewSwaggerDtoDecorators.rating
	rating: number

	@IsString()
  @ReviewSwaggerDtoDecorators.text
	text: string
}