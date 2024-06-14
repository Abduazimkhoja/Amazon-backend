import { ApiProperty } from '@nestjs/swagger'

export const authEmailSwaggerDto = ApiProperty({
	description: 'User Email',
	example: 'email@example.com'
})

export const authPasswordSwaggerDto = ApiProperty({
	description: 'User password',
	example: 'password123'
})
