import { faker } from '@faker-js/faker'
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnCategoryObject } from './category-return.object'
import { CategoryDto } from './category.dto'

type CategoryWhereInput<T, L> =
	| { id: T; slug?: never }
	| { id?: never; slug: L }

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	// GET
	async getAll() {
		const categories = this.prisma.category.findMany({
			select: returnCategoryObject
		})

		if (!categories) throw new NotFoundException('Category not found')

		return categories
	}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: { id },
			select: returnCategoryObject
		})

		if (!category) throw new NotFoundException('Category not found')

		return category
	}

	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: { slug },
			select: returnCategoryObject
		})

		if (!category) throw new NotFoundException('Category not found')

		return category
	}

	// POST
	async create(dto: CategoryDto) {
		const slug = faker.helpers.slugify(dto.name).toLowerCase()
		await this.checkCategoryExists(
			{ where: { slug }, select: { slug: true } },
			'A category with that name already exists',
			true
		)

		return this.prisma.category.create({
			data: {
				name: dto.name,
				slug
			}
		})
	}

	// PUT
	async update(id: number, dto: CategoryDto) {
		await this.checkCategoryExists(
			{ where: { id }, select: { id: true } },
			'Category not found'
		)

		return this.prisma.category.update({
			where: { id },
			data: {
				name: dto.name,
				slug: faker.helpers.slugify(dto.name).toLowerCase()
			}
		})
	}

	// DELETE
	async delete(id: number) {
		await this.checkCategoryExists(
			{ where: { id }, select: { id: true } },
			'Category not found'
		)

		return this.prisma.category.delete({ where: { id } })
	}

	// 🔏> PRIVATE Functions
  private async checkCategoryExists(
		find: {
			where: CategoryWhereInput<number, string>
			select: CategoryWhereInput<boolean, boolean>
		},
		msg: string,
		exist: boolean = false // при каком состоянии ответа вызывать ошибку
	): Promise<void> {
		// Проверяет есть ли категория или нет.
		const existingCategory = await this.prisma.category.findUnique(find)

		if (exist ? !!existingCategory : !existingCategory) {
			throw new NotFoundException(`${msg}`)
		}
	}
}
