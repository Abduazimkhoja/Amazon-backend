import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './user.dto'
import { returnUserObject } from './user.object'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	// GET
	async getLength() {
		const usersLength = Number(await this.prisma.user.count())
		return isNaN(usersLength) ? 0 : usersLength
	}

	async getAll() {
		const users = await this.prisma.user.findMany({
			select: returnUserObject
		})

		if (!users) throw new NotFoundException('Users not found')
		return users
	}

	async byId(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				...returnUserObject,
				favorites: {
					select: {
						id: true,
						name: true,
						price: true,
						images: true,
						slug: true,
						category: {
							select: {
								slug: true
							}
						},
						reviews: true
					}
				},
				...selectObject
			}
		})

		if (!user) throw new NotFoundException('User not found')
		return user
	}

	async getIsAdmin(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: { isAdmin: true }
		})

		if (!user) throw new NotFoundException('Users not found')
		return user.isAdmin
	}

	// PUT
	async updateProfile(id: number, dto: UserDto) {
		const isSameUser = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})

		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email already in use')

		const user = await this.byId(id)

		return this.prisma.user.update({
			where: { id },
			data: {
				email: dto.email,
				name: dto.name,
				avatarPath: dto.avatarPath,
				phone: dto.phone,
				password: dto.password ? await hash(dto.password) : user.password
			}
		})
	}

	// PATCH
	async toggleFavorite(userId: number, productId: number) {
		const userWithFavorite = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				favorites: {
					where: {
						id: productId
					},
					select: { id: true }
				}
			}
		})

		if (!userWithFavorite) throw new NotFoundException('User not found')

		const isExists = userWithFavorite.favorites.length > 0

		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				favorites: {
					[isExists ? 'disconnect' : 'connect']: {
						id: +productId
					}
				}
			}
		})

		return { message: 'Success', status: !isExists }
	}
}
