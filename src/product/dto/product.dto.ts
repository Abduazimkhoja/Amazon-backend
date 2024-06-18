import { Prisma } from '@prisma/client'
import {
	ArrayMaxSize,
	ArrayMinSize,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'
import { ProductSwaggerDtoDecorators } from '../swagger/product-swagger.dto'

export class ProductDto implements Prisma.ProductUpdateInput {
	@IsString()
	@ProductSwaggerDtoDecorators.name
	name: string

	@IsNumber()
	@ProductSwaggerDtoDecorators.price
	price: number

	@IsOptional()
	@IsString()
	@ProductSwaggerDtoDecorators.description
	description: string

	@IsString({ each: true })
	@ArrayMinSize(1)
	@ArrayMaxSize(12)
	@ProductSwaggerDtoDecorators.images
	images?: string[]

	@IsNumber()
	@ProductSwaggerDtoDecorators.categoryId
	categoryId: number
}
