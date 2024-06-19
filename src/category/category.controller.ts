import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'
import { CategorySwaggerControllerDecorators } from './swagger/category-swagger.controller'

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	// get all category
	@Get()
	@CategorySwaggerControllerDecorators.getAll()
	async getAll() {
		return this.categoryService.getAll()
	}

	// get by id
	@Get(':id')
	@CategorySwaggerControllerDecorators.getById()
	async getById(@Param('id') id: string) {
		return this.categoryService.byId(+id)
	}

	// get slug
	@Get('by-slug/:slug')
	@CategorySwaggerControllerDecorators.getBySlug()
	async getBySlug(@Param('slug') slug: string) {
		return this.categoryService.bySlug(slug)
	}

	// create category
	@HttpCode(200)
	@Auth('admin')
	@Post()
	@CategorySwaggerControllerDecorators.create()
	async create(@Body() dto: CategoryDto) {
		return this.categoryService.create(dto)
	}

	// update category
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Put(':id')
	@CategorySwaggerControllerDecorators.update()
	async update(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.update(+id, dto)
	}

	// Delete
	@HttpCode(200)
	@Auth('admin')
	@Delete(':id')
	@CategorySwaggerControllerDecorators.delete()
	async delete(@Param('id') id: string) {
		return this.categoryService.delete(+id)
	}
}
