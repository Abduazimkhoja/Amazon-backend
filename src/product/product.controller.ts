import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { GetAllProductDto } from './dto/get-all.product.dto'
import { ProductDto } from './dto/product.dto'
import { ProductService } from './product.service'
import { ProductSwaggerControllerDecorators } from './swagger/product-swagger.controller'

@ApiTags('Products')
@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	// getAll product
	@UsePipes(new ValidationPipe())
	@Get()
	@ProductSwaggerControllerDecorators.getAll()
	async getAll(@Query() queryDto?: GetAllProductDto) {
		return this.productService.getAll(queryDto)
	}

	// get product by id
	@Auth('admin')
	@Get(':id')
	@ProductSwaggerControllerDecorators.getById()
	async getById(@Param('id') id: string) {
		return this.productService.byId(+id)
	}

	// get product similar
	@Get('similar/:id')
	@ProductSwaggerControllerDecorators.getSimilar()
	async getSimilar(@Param('id') id: string) {
		return this.productService.getSimilar(+id)
	}

	// get product by slug
	@Get('by-slug/:slug')
	@ProductSwaggerControllerDecorators.getBySlug()
	async getBySlug(@Param('slug') slug: string) {
		return this.productService.bySlug(slug)
	}

	// get product by categorySlug
	@Get('by-category/:categorySlug')
	@ProductSwaggerControllerDecorators.getByCategorySlug()
	async getByCategorySlug(@Param('categorySlug') categorySlug: string) {
		return this.productService.byCategory(categorySlug)
	}

	// Create product
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Post()
	@ProductSwaggerControllerDecorators.create()
	async create(@CurrentUser('id') id: number, @Body() dto: ProductDto) {
		return this.productService.create(+id, dto)
	}

	// Update product
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth('admin')
	@ProductSwaggerControllerDecorators.update()
	async update(@Param('id') id: string, @Body() dto: ProductDto) {
		return this.productService.update(+id, dto)
	}

	// Delete product
	@HttpCode(200)
	@Delete(':id')
	@Auth('admin')
	@ProductSwaggerControllerDecorators.delete()
	async delete(@Param('id') id: string) {
		return this.productService.delete(+id)
	}
}
