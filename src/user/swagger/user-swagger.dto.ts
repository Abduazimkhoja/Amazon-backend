import { ApiProperty } from '@nestjs/swagger'

const UserEmailSwaggerDto = ApiProperty({
	description: 'User Email',
	example: 'email@example.com'
})

const UserPasswordSwaggerDto = ApiProperty({
	description: 'User Password',
	example: 'password123'
})

const UserNameSwaggerDto = ApiProperty({
	description: 'User Name',
	example: 'Alex'
})

const UserPhoneSwaggerDto = ApiProperty({
	description: 'User Phone',
	example: '998990004499'
})

const UserAvatarPathSwaggerDto = ApiProperty({
	description: 'User Avatar Path',
	example: 'https://image.jpg'
})

export const UserSwaggerDtoDecorators = {
	email: UserEmailSwaggerDto,
	password: UserPasswordSwaggerDto,
	name: UserNameSwaggerDto,
	phone: UserPhoneSwaggerDto,
	avatarPath: UserAvatarPathSwaggerDto
}
