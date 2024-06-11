import { faker } from '@faker-js/faker'
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CategoryService } from 'src/category/category.service'
import { PrismaService } from 'src/prisma.service'
import { convertToNumber } from 'src/utils/convert-to-number'
import { PaginationService } from '../pagination/pagination.service'
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto'
import { ProductDto } from './dto/product.dto'
import {
	returnProductObject,
	returnProductObjectFullest,
	returnProductObjectMinify
} from './product-return.object'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private paginationService: PaginationService,
		private categoryService: CategoryService
	) {}

	async getAll(dto?: GetAllProductDto) {
		const select = dto?.minify
			? { ...returnProductObjectMinify }
			: { ...returnProductObject }

		if (!Object.keys(dto).length) {
			let products = await this.prisma.product.findMany({ select })
			if (!products) throw new NotFoundException('Products not found')

			return { products, length: products.length }
		}

		const { perPage, skip } = this.paginationService.getPagination(dto)
		const where = this.createFilter(dto)
		const productParams = {
			where,
			orderBy: this.getSortOption(dto.sort),
			take: perPage,
			skip,
			select
		}

		const products = await this.prisma.product.findMany(productParams)
		if (!products) throw new NotFoundException('Products not found')

		const length = await this.prisma.product.count({ where })

		return { products, length }
	}

	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: { id },
			select: returnProductObjectFullest
		})

		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: { slug },
			select: returnProductObjectFullest
		})

		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async byCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: { category: { slug: categorySlug } },
			select: returnProductObjectFullest
		})

		if (!products) throw new NotFoundException('Product not found')

		return products
	}

	async getSimilar(id: number) {
		const currentProduct = await this.byId(id)

		if (!currentProduct)
			throw new NotFoundException('Current product not found!')

		const products = await this.prisma.product.findMany({
			where: {
				category: { name: currentProduct.category.name },
				NOT: { id: currentProduct.id }
			},
			orderBy: { createdAt: 'desc' },
			select: returnProductObject
		})

		return products
	}

	async create(userId: number, dto: ProductDto) {
		const { description, images, price, name, categoryId } = dto

		// Проверка входных данных
		if (!name || !description || !price || !images || !categoryId) {
			throw new BadRequestException('Missing required fields')
		}

		try {
			// Создание продукта
			const product = await this.prisma.product.create({
				data: {
					name,
					description,
					price,
					images,
					slug: faker.helpers.slugify(name).toLowerCase(),
					user: { connect: { id: userId } },
					category: { connect: { id: categoryId } }
				}
			})
			return { status: 'success', id: product.id }
		} catch (error) {
			// Обработка ошибок подключения к базе данных
			if (error.code === 'P2002') {
				throw new BadRequestException('Duplicate entry')
			}

			// Обработка ошибки при связывании с пользователем или категорией
			if (error.code === 'P2025') {
				throw new NotFoundException('User or category not found')
			}

			// Обработка неизвестных ошибок
			throw new InternalServerErrorException(
				'Internal server error: ' + error.message
			)
		}
	}

	async update(id: number, dto: ProductDto) {
		const { description, images, price, name, categoryId } = dto

		await this.categoryService.byId(categoryId)

		return this.prisma.product.update({
			where: { id },
			data: {
				description,
				images,
				price,
				name,
				slug: faker.helpers.slugify(name).toLowerCase(),
				category: { connect: { id: categoryId } }
			}
		})
	}

	async delete(id: number) {
		return this.prisma.product.delete({ where: { id } })
	}

	// 🔏> PRIVATE FUNCTION ~~~

	private createFilter(dto: GetAllProductDto): Prisma.ProductWhereInput {
		const filters: Prisma.ProductWhereInput[] = []

		if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm))

		if (dto.ratings) {
			const ratingToNumber = dto.ratings
				.split('|')
				.map(Number)
				.filter(value => !isNaN(value))
			filters.push(this.getRatingFilter(ratingToNumber))
		}

		if (dto.minPrice || dto.maxPrice)
			filters.push(
				this.getPriceFilter(
					convertToNumber(dto.minPrice),
					convertToNumber(dto.maxPrice)
				)
			)

		if (dto.categoryId)
			filters.push(this.getCategoryFilter(Number(dto.categoryId)))

		return filters.length ? { AND: filters } : {}
	}

	private getSortOption(
		sort?: EnumProductSort
	): Prisma.ProductOrderByWithRelationInput[] {
		const sortObject: Record<
			EnumProductSort,
			Prisma.ProductOrderByWithRelationInput
		> = {
			'low-price': { price: 'asc' },
			'high-price': { price: 'desc' },
			oldest: { createdAt: 'asc' },
			newest: { createdAt: 'desc' }
		}

		return [sortObject[sort] || sortObject['newest']]
	}

	private getSearchTermFilter(searchTerm: string): Prisma.ProductWhereInput {
		return {
			OR: [
				{
					category: {
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				},
				{
					name: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{
					description: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				}
			]
		}
	}

	private getRatingFilter(ratings: number[]): Prisma.ProductWhereInput {
		return {
			reviews: {
				some: {
					rating: {
						in: ratings
					}
				}
			}
		}
	}

	private getPriceFilter(
		minPrice?: number,
		maxPrice?: number
	): Prisma.ProductWhereInput {
		let priceFilter: Prisma.IntFilter | undefined = undefined

		if (minPrice) {
			priceFilter = {
				...priceFilter,
				gte: minPrice
			}
		}

		if (maxPrice) {
			priceFilter = {
				...priceFilter,
				lte: maxPrice
			}
		}

		return {
			price: priceFilter
		}
	}

	private getCategoryFilter(categoryId: number): Prisma.ProductWhereInput {
		return { categoryId }
	}
}
