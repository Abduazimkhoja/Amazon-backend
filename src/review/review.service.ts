import {
	ForbiddenException,
	Injectable,
	NotAcceptableException,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductService } from 'src/product/product.service'
import { returnReviewObject } from './review-return.object'
import { ReviewDto } from './review.dto'
import { UserService } from 'src/user/user.service'

@Injectable()
export class ReviewService {
	constructor(
		private prisma: PrismaService,
		private productService: ProductService,
		private userService: UserService
	) {}

	async getAll() {
		const reviews = await this.prisma.review.findMany({
			orderBy: { createdAt: 'desc' },
			select: returnReviewObject
		})

		if (!reviews) throw new NotFoundException('Product not found')

		return reviews
	}

	async create(userId: number, dto: ReviewDto, productId: number) {
		await this.productService.byId(productId)

		return this.prisma.review.create({
			data: {
				...dto,
				product: { connect: { id: productId } },
				user: { connect: { id: userId } }
			}
		})
	}

	async update(userId: number, dto: ReviewDto, reviewId: number) {
		const existingReview = await this.prisma.review.findUnique({
			where: { id: reviewId },
			select: returnReviewObject
		})

    const isAdmin = await this.userService.getIsAdmin(userId)

		if (!existingReview) throw new NotFoundException(`Review with not found`)

		if (existingReview.userId !== userId && !isAdmin)
			throw new ForbiddenException(`This review is not from this user`)

		if (
			existingReview.text === dto.text &&
			existingReview.rating === dto.rating
		)
			throw new NotAcceptableException(
				`The review has not changed. There is no need to upgrade.`
			)

		return this.prisma.review.update({
			where: { id: reviewId },
			data: { ...dto }
		})
	}

	// average score
	async getAverageValueByProductId(productId: number) {
		return this.prisma.review
			.aggregate({
				where: { productId },
				_avg: { rating: true }
			})
			.then(data => data._avg)
	}
}
