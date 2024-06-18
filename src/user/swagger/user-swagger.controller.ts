import { applyDecorators } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { UserDto } from '../user.dto'

const getAllUsersSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get All Users',
			description: 'Endpoint to get all users'
		}),
		ApiOkResponse({ description: 'All users retrieved successfully' }),
		ApiUnauthorizedResponse({ description: 'Unauthorized' })
	)

const getUserProfileSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get User Profile',
			description: 'Endpoint to get user profile'
		}),
		ApiOkResponse({ description: 'User profile retrieved successfully' }),
		ApiUnauthorizedResponse({ description: 'Unauthorized' })
	)

const updateUserProfileSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Update User Profile',
			description: 'Endpoint to update user profile'
		}),
		ApiBody({
			description: 'User DTO',
			type: UserDto,
			examples: {
				example1: {
					summary: 'Example User Update',
					value: { name: 'John Doe', email: 'john.doe@example.com' }
				}
			}
		}),
		ApiOkResponse({ description: 'User profile updated successfully' }),
		ApiBadRequestResponse({ description: 'Invalid user data' }),
		ApiUnauthorizedResponse({ description: 'Unauthorized' })
	)

const toggleFavoriteSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Toggle Favorite',
			description: 'Endpoint to toggle favorite product'
		}),
		ApiParam({
			name: 'productId',
			description: 'ID of the product to toggle favorite',
			type: String
		}),
		ApiOkResponse({ description: 'Favorite status toggled successfully' }),
		ApiUnauthorizedResponse({ description: 'Unauthorized' })
	)

export const UserSwaggerControllerDecorators = {
	getAll: getAllUsersSwaggerDecorator,
	getUserProfile: getUserProfileSwaggerDecorator,
	updateUserProfile: updateUserProfileSwaggerDecorator,
	toggleFavorite: toggleFavoriteSwaggerDecorator
}
