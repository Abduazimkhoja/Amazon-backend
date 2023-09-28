import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Delete,
	Put,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	// get slug
	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.categoryService.bySlug(slug)
	}

	// by id
	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.categoryService.byId(+id)
	}

	// get all category
	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	// create category
	@HttpCode(200)
	@Auth()
	@Post()
	async create(@Body() dto: CategoryDto) {
		return this.categoryService.create(dto)
	}

	// update category
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.update(+id, dto)
	}

	// Delete
	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.categoryService.delete(+id)
	}
}
