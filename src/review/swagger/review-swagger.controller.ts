import { applyDecorators } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam
} from '@nestjs/swagger'
import { ReviewDto } from '../review.dto'

const getAllReviewsSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get All Reviews',
			description: 'Endpoint to get all reviews'
		}),
		ApiOkResponse({
			description: 'All reviews retrieved successfully',
			type: [ReviewDto]
		})
	)

const getReviewByIdSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get Review by ID',
			description: 'Endpoint to get a review by its ID'
		}),
		ApiParam({ name: 'id', description: 'ID of the review', type: String }),
		ApiOkResponse({
			description: 'Review retrieved successfully',
			type: ReviewDto
		})
	)

const getAverageByProductSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get Average Review by Product',
			description: 'Endpoint to get average review by product ID'
		}),
		ApiParam({
			name: 'productId',
			description: 'ID of the product',
			type: String
		}),
		ApiOkResponse({
			description: 'Average review value retrieved successfully',
			type: Number
		})
	)

const createReviewSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Create Review',
			description: 'Endpoint to create a new review'
		}),
		ApiParam({
			name: 'productId',
			description: 'ID of the product',
			type: String
		}),
		ApiBody({
			description: 'Review DTO',
			type: ReviewDto
		}),
		ApiOkResponse({
			description: 'Review created successfully',
			type: ReviewDto
		}),
		ApiBadRequestResponse({ description: 'Invalid review data' })
	)

const updateReviewSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Update Review',
			description: 'Endpoint to update an existing review'
		}),
		ApiParam({
			name: 'reviewId',
			description: 'ID of the review',
			type: String
		}),
		ApiBody({
			description: 'Review DTO',
			type: ReviewDto
		}),
		ApiOkResponse({
			description: 'Review updated successfully',
			type: ReviewDto
		}),
		ApiBadRequestResponse({ description: 'Invalid review data' })
	)

const deleteReviewSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Delete Review',
			description: 'Endpoint to delete a review'
		}),
		ApiParam({
			name: 'reviewId',
			description: 'ID of the review',
			type: String
		}),
		ApiOkResponse({ description: 'Review deleted successfully' })
	)

export const ReviewSwaggerControllerDecorators = {
	getAll: getAllReviewsSwaggerDecorator,
	getById: getReviewByIdSwaggerDecorator,
	getAverageByProduct: getAverageByProductSwaggerDecorator,
	create: createReviewSwaggerDecorator,
	update: updateReviewSwaggerDecorator,
	delete: deleteReviewSwaggerDecorator
}
