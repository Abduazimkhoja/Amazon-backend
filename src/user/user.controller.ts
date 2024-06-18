import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserSwaggerControllerDecorators } from './swagger/user-swagger.controller'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}
	// GET
	// get all users
	@Get()
	@Auth('admin')
	@UserSwaggerControllerDecorators.getAll()
	async getAll() {
		return this.userService.getAll()
	}

	// get user profile
	@Get('profile')
	@Auth()
	@UserSwaggerControllerDecorators.getUserProfile()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	// PUT
	// update profile
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put('profile')
	@UserSwaggerControllerDecorators.updateUserProfile()
	async getNewTokens(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}

	// PATCH
	// toggle favorite
	@HttpCode(200)
	@Auth()
	@Patch('profile/favorites/:productId')
	@UserSwaggerControllerDecorators.toggleFavorite()
	async toggleFavorite(
		@CurrentUser('id') id: number,
		@Param('productId') productId: string
	) {
		return this.userService.toggleFavorite(id, +productId)
	}
}
