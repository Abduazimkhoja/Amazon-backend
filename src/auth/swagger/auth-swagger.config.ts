import {
	authAccessTokenSwaggerDecorator,
	authLoginSwaggerDecorator,
	authRegisterSwaggerDecorator
} from './auth-swagger.decorators'
import { authEmailSwaggerDto, authPasswordSwaggerDto } from './auth-swagger.dto'

export const AuthSwaggerConfig = {
	controller: {
		login: authLoginSwaggerDecorator,
		accessToken: authAccessTokenSwaggerDecorator,
		register: authRegisterSwaggerDecorator
	},
	dto: {
		email: authEmailSwaggerDto,
		password: authPasswordSwaggerDto
	}
}
