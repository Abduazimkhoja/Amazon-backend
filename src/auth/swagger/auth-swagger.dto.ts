import { ApiProperty } from '@nestjs/swagger'

const authEmailSwaggerDto = ApiProperty({
	description: 'User Email',
	example: 'email@example.com'
})

const authPasswordSwaggerDto = ApiProperty({
	description: 'User password',
	example: 'password123'
})

export const AuthSwaggerDtoDecorators = {
	email: authEmailSwaggerDto,
	password: authPasswordSwaggerDto
}
