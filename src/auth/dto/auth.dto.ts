import { IsEmail, IsString, MinLength } from 'class-validator'
import { AuthSwaggerDtoDecorators } from '../swagger/auth-swagger.dto'

export class AuthDto {
	@AuthSwaggerDtoDecorators.email
	@IsEmail()
	email: string

	@AuthSwaggerDtoDecorators.password
	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	@IsString()
	password: string
}
