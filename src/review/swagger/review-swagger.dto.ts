import { ApiProperty } from '@nestjs/swagger'

const ReviewRatingSwaggerDto = ApiProperty({
  description: 'Rating of the review',
  example: 4,
  minimum: 1,
  maximum: 5,
});

const ReviewTextSwaggerDto = ApiProperty({
  description: 'Text of the review',
  example: 'Great product! Highly recommended.',
});

export const ReviewSwaggerDtoDecorators = {
  rating: ReviewRatingSwaggerDto,
  text: ReviewTextSwaggerDto,
};