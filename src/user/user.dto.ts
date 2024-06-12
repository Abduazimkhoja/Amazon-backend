import { IsEmail, IsOptional, IsString } from 'class-validator'
import { ApiPropertyFactory } from 'src/utils/api-property-factory'

export class UserDto {
	@ApiPropertyFactory('User name', 'Alex')
	@IsOptional()
	@IsString()
	name: string

	@ApiPropertyFactory('User email address', 'emailName@gmail.com')
	@IsEmail()
	email: string

	@ApiPropertyFactory('User phone', '998990004499')
	@IsOptional()
	@IsString()
	phone?: string

	@ApiPropertyFactory('User password', 'f30L@jfsjlapkc')
	@IsOptional()
	@IsString()
	password?: string

	@ApiPropertyFactory('User avatarPath', 'https://image.jpg')
	@IsOptional()
	@IsString()
	avatarPath: string
}
