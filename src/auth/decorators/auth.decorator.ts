import { UseGuards, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { TypeRole } from '../auth.interface'
import { OnlyAdminGuard } from '../guards/admin.guard'
import { JwtAuthGuard } from '../guards/jwt.guard'

export const Auth = (role: TypeRole = 'user') => {
	if (role === 'admin') {
		return applyDecorators(
			UseGuards(JwtAuthGuard, OnlyAdminGuard),
			ApiBearerAuth(),
			ApiUnauthorizedResponse({
				description: '🔐 Unauthorized. User must be an administrator.'
			})
		)
	} else {
		return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth())
	}
}
