import { applyDecorators } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam
} from '@nestjs/swagger'
import { CategoryDto } from '../category.dto'

const getAllCategoriesSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get All Categories',
			description: 'Endpoint to get all categories'
		}),
		ApiOkResponse({
			description: 'All categories retrieved successfully',
			type: [CategoryDto]
		})
	)

const getCategoryByIdSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get Category by ID',
			description: 'Endpoint to get a category by its ID'
		}),
		ApiParam({ name: 'id', description: 'ID of the category', type: String }),
		ApiOkResponse({
			description: 'Category retrieved successfully',
			type: CategoryDto
		})
	)

const getCategoryBySlugSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get Category by Slug',
			description: 'Endpoint to get a category by its slug'
		}),
		ApiParam({
			name: 'slug',
			description: 'Slug of the category',
			type: String
		}),
		ApiOkResponse({
			description: 'Category retrieved successfully',
			type: CategoryDto
		})
	)

const createCategorySwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Create Category',
			description: 'Endpoint to create a new category'
		}),
		ApiBody({
			description: 'Category DTO',
			type: CategoryDto
		}),
		ApiOkResponse({
			description: 'Category created successfully',
			type: CategoryDto
		}),
		ApiBadRequestResponse({ description: 'Invalid category data' })
	)

const updateCategorySwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Update Category',
			description: 'Endpoint to update an existing category'
		}),
		ApiParam({ name: 'id', description: 'ID of the category', type: String }),
		ApiBody({
			description: 'Category DTO',
			type: CategoryDto
		}),
		ApiOkResponse({
			description: 'Category updated successfully',
			type: CategoryDto
		}),
		ApiBadRequestResponse({ description: 'Invalid category data' })
	)

const deleteCategorySwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Delete Category',
			description: 'Endpoint to delete a category'
		}),
		ApiParam({ name: 'id', description: 'ID of the category', type: String }),
		ApiOkResponse({ description: 'Category deleted successfully' })
	)

export const CategorySwaggerControllerDecorators = {
	getAll: getAllCategoriesSwaggerDecorator,
	getById: getCategoryByIdSwaggerDecorator,
	getBySlug: getCategoryBySlugSwaggerDecorator,
	create: createCategorySwaggerDecorator,
	update: updateCategorySwaggerDecorator,
	delete: deleteCategorySwaggerDecorator
}
