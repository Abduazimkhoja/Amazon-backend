import { applyDecorators } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery
} from '@nestjs/swagger'
import { GetAllProductDto } from '../dto/get-all.product.dto'
import { ProductDto } from '../dto/product.dto'

const getAllProductsSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get All Products',
			description: 'Endpoint to get all products'
		}),
		ApiQuery({ name: 'queryDto', required: false, type: GetAllProductDto }),
		ApiOkResponse({
			description: 'All products retrieved successfully',
			type: [ProductDto]
		})
	)

const getProductByIdSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get Product by ID',
			description: 'Endpoint to get a product by its ID'
		}),
		ApiParam({ name: 'id', description: 'ID of the product', type: String }),
		ApiOkResponse({
			description: 'Product retrieved successfully',
			type: ProductDto
		})
	)

const getSimilarProductsSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get Similar Products',
			description: 'Endpoint to get similar products'
		}),
		ApiParam({ name: 'id', description: 'ID of the product', type: String }),
		ApiOkResponse({
			description: 'Similar products retrieved successfully',
			type: [ProductDto]
		})
	)

const getProductBySlugSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get Product by Slug',
			description: 'Endpoint to get a product by its slug'
		}),
		ApiParam({
			name: 'slug',
			description: 'Slug of the product',
			type: String
		}),
		ApiOkResponse({
			description: 'Product retrieved successfully',
			type: ProductDto
		})
	)

const getProductByCategorySlugSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get Product by Category Slug',
			description: 'Endpoint to get products by category slug'
		}),
		ApiParam({
			name: 'categorySlug',
			description: 'Category slug',
			type: String
		}),
		ApiOkResponse({
			description: 'Products retrieved successfully',
			type: [ProductDto]
		})
	)

const createProductSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Create Product',
			description: 'Endpoint to create a new product'
		}),
		ApiBody({
			description: 'Product DTO',
			type: ProductDto,
			examples: {
				example1: {
					summary: 'Example Product',
					value: {
						name: 'Product Name',
						price: 100,
						description: 'Product Description',
						images: ['image1.jpg'],
						categoryId: 1
					}
				}
			}
		}),
		ApiOkResponse({ description: 'Product created successfully' }),
		ApiBadRequestResponse({ description: 'Invalid product data' })
	)

const updateProductSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Update Product',
			description: 'Endpoint to update an existing product'
		}),
		ApiParam({ name: 'id', description: 'ID of the product', type: String }),
		ApiBody({
			description: 'Product DTO',
			type: ProductDto,
			examples: {
				example1: {
					summary: 'Example Product',
					value: {
						name: 'Updated Product Name',
						price: 150,
						description: 'Updated Product Description',
						images: ['image1.jpg'],
						categoryId: 1
					}
				}
			}
		}),
		ApiOkResponse({ description: 'Product updated successfully' }),
		ApiBadRequestResponse({ description: 'Invalid product data' })
	)

const deleteProductSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Delete Product',
			description: 'Endpoint to delete a product'
		}),
		ApiParam({ name: 'id', description: 'ID of the product', type: String }),
		ApiOkResponse({ description: 'Product deleted successfully' })
	)

export const ProductSwaggerControllerDecorators = {
	getAll: getAllProductsSwaggerDecorator,
	getById: getProductByIdSwaggerDecorator,
	getSimilar: getSimilarProductsSwaggerDecorator,
	getBySlug: getProductBySlugSwaggerDecorator,
	getByCategorySlug: getProductByCategorySlugSwaggerDecorator,
	create: createProductSwaggerDecorator,
	update: updateProductSwaggerDecorator,
	delete: deleteProductSwaggerDecorator
}
