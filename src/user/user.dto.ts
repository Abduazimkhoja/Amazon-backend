import { IsEmail, IsOptional, IsString } from 'class-validator'
import { UserSwaggerDtoDecorators } from './swagger/user-swagger.dto'

export class UserDto {
	@IsOptional()
	@IsString()
	@UserSwaggerDtoDecorators.name
	name: string

	@IsEmail()
	@UserSwaggerDtoDecorators.email
	email: string

	@IsOptional()
	@IsString()
	@UserSwaggerDtoDecorators.phone
	phone?: string

	@IsOptional()
	@IsString()
	@UserSwaggerDtoDecorators.password
	password?: string

	@IsOptional()
	@IsString()
	@UserSwaggerDtoDecorators.avatarPath
	avatarPath: string
}
