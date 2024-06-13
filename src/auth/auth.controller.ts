import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
	applyDecorators
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { AuthSwaggerConfig } from './swagger/auth-swagger.config'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	@applyDecorators(...AuthSwaggerConfig.controller.login)
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/access-token')
	@applyDecorators(...AuthSwaggerConfig.controller.accessToken)
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewTokens(dto.refreshToken)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	@applyDecorators(...AuthSwaggerConfig.controller.register)
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}
}
