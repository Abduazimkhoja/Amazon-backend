import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaService } from 'src/prisma.service'
import { getJwtConfig } from 'src/config/jwt.config'
import { JwtStrategy } from './jwt.strategy'
import { UserService } from 'src/user/user.service'
import { UserModule } from 'src/user/user.module' 

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService, UserService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
    UserModule
	]
})
export class AuthModule {}
