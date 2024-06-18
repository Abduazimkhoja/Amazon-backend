import { ApiProperty } from '@nestjs/swagger'

const ProductNameSwaggerDto = ApiProperty({
	description: 'Product name',
	example: 'Product Name'
})

const ProductPriceSwaggerDto = ApiProperty({
	description: 'Product price',
	example: 100
})

const ProductDescriptionSwaggerDto = ApiProperty({
	description: 'Product description',
	example: 'Product Description'
})

const ProductImagesSwaggerDto = ApiProperty({
	description: 'Product images',
	example: ['image1.jpg', 'image2.jpg'],
	isArray: true
})

const ProductCategoryIdSwaggerDto = ApiProperty({
	description: 'Category ID of the product',
	example: 1
})

export const ProductSwaggerDtoDecorators = {
	name: ProductNameSwaggerDto,
	price: ProductPriceSwaggerDto,
	description: ProductDescriptionSwaggerDto,
	images: ProductImagesSwaggerDto,
	categoryId: ProductCategoryIdSwaggerDto
}
