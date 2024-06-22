import { ApiProperty } from '@nestjs/swagger'

const CategoryNameSwaggerDto = ApiProperty({
  description: 'Category name',
  example: 'Electronics'
});

export const CategorySwaggerDtoDecorators = {
  name: CategoryNameSwaggerDto,
};