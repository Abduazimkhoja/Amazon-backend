import { IsString } from 'class-validator'
import { AuthSwaggerDtoDecorators } from '../swagger/auth-swagger.dto'

export class RefreshTokenDto {
	@IsString()
	@AuthSwaggerDtoDecorators.refreshToken
	refreshToken: string
}
