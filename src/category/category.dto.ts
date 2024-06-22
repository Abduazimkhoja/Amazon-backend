import { IsString } from 'class-validator'
import { CategorySwaggerDtoDecorators } from './swagger/category-swagger.dto'

export class CategoryDto {
	@IsString()
	@CategorySwaggerDtoDecorators.name
	name: string
}
1