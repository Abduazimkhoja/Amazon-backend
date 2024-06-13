import { IsEmail, IsString, MinLength } from 'class-validator'
import { AuthSwaggerConfig } from '../swagger/auth-swagger.config'

export class AuthDto {
	@AuthSwaggerConfig.dto.email
	@IsEmail()
	email: string

	@AuthSwaggerConfig.dto.password
	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	@IsString()
	password: string
}
