import {
	ApiBadRequestResponse,
	ApiBody,
	ApiOkResponse,
	ApiOperation
} from '@nestjs/swagger'
import { AuthDto } from '../dto/auth.dto'
import { RefreshTokenDto } from '../dto/refresh-token.dto'

export const authLoginSwaggerDecorator = [
	ApiOperation({
		summary: 'Login User',
		description: 'Endpoint to log in a user'
	}),
	ApiBody({
		description: 'Login DTO',
		type: AuthDto,
		examples: {
			example1: {
				summary: 'Example Login',
				value: { email: 'email@example.com', password: 'password123' }
			}
		}
	}),
	ApiOkResponse({ description: 'User logged in successfully' }),
	ApiBadRequestResponse({ description: 'Invalid login data' })
]

export const authAccessTokenSwaggerDecorator = [
	ApiOperation({
		summary: 'Get New Access Token',
		description: 'Endpoint to get new access tokens using a refresh token'
	}),
	ApiBody({
		description: 'Refresh Token DTO',
		type: RefreshTokenDto,
		required: true,
		examples: {
			example1: {
				summary: 'Example Refresh Token',
				value: { refreshToken: 'example-refresh-token' }
			}
		}
	}),
	ApiOkResponse({ description: 'New access tokens issued successfully' }),
	ApiBadRequestResponse({ description: 'Invalid refresh token' })
]

export const authRegisterSwaggerDecorator = [
	ApiOperation({
		summary: 'Register User',
		description: 'Endpoint to register a new user'
	}),
	ApiBody({
		description: 'Register DTO',
		type: AuthDto,
		required: true,
		examples: {
			example1: {
				summary: 'Example Register',
				value: { email: 'email@example.com', password: 'password123' }
			}
		}
	}),
	ApiOkResponse({ description: 'User registered successfully' }),
	ApiBadRequestResponse({ description: 'Invalid registration data' })
]
