import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
// import { PrismaService } from './prisma.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	// const prismaService = app.get(PrismaService)
	// await prismaService.enableShutdownHooks(app)

	const config = new DocumentBuilder()
		.setTitle('Cats example')
		.setDescription('The cats API description')
		.addBearerAuth()
		.setVersion('1.0')
		.setBasePath('/api')
		.build()

	const document = SwaggerModule.createDocument(app, config)

	const swaggerOptions = {
		swaggerOptions: {
			docExpansion: 'none' // Все теги будут свернуты по умолчанию
		}
	}

	SwaggerModule.setup('api/docs', app, document, swaggerOptions)

	app.enableCors()
	await app.listen(4200)
}
bootstrap()
