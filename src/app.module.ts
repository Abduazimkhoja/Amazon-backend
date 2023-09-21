import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { AuthService } from './auth/auth.service'
import { JwtService } from '@nestjs/jwt'

@Module({
	imports: [ConfigModule.forRoot(), AuthModule],
	controllers: [AppController],
	providers: [AppService, PrismaService, AuthService, JwtService]
})
export class AppModule {}
