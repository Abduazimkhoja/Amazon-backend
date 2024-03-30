import {
	ForbiddenException,
	Injectable,
	NotAcceptableException,
	NotFoundException,
	NotImplementedException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductService } from 'src/product/product.service'
import { UserService } from 'src/user/user.service'
import { returnReviewObject } from './review-return.object'
import { ReviewDto } from './review.dto'

@Injectable()
export class ReviewService {
	constructor(
		private prisma: PrismaService,
		private productService: ProductService,
		private userService: UserService
	) {}

	// GET
	async getAll() {
		const reviews = await this.prisma.review.findMany({
			orderBy: { createdAt: 'desc' },
			select: returnReviewObject
		})

		if (!reviews) throw new NotFoundException('Reviews not found')

		return reviews
	}

	async byId(id: number) {
		const review = await this.prisma.review.findUnique({
			where: { id },
			select: returnReviewObject
		})

		if (!review) {
			throw new NotFoundException('Review not found')
		}

		return review
	}

	async getAverageValueByProductId(productId: number) {
		return this.prisma.review
			.aggregate({
				where: { productId },
				_avg: { rating: true }
			})
			.then(data => data._avg)
	}

	// POST
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

	// PUT
	async update(userId: number, dto: ReviewDto, reviewId: number) {
		const existingReview = await this.byId(reviewId)

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

		try {
			return this.prisma.review.update({
				where: { id: reviewId },
				data: { ...dto }
			})
		} catch (error) {
			throw new NotImplementedException(
				`Couldn't delete review, error code: ${error.code}`
			)
		}
	}

	// DELETE
	async delete(userId: number, reviewId: number) {
		const existingReview = await this.byId(reviewId)

		if (!existingReview) throw new NotFoundException(`Review with not found`)

		const isAdmin = await this.userService.getIsAdmin(userId)

		if (existingReview.userId !== userId && !isAdmin)
			throw new ForbiddenException(`This review is not from this user`)

		try {
			await this.prisma.review.delete({
				where: { id: reviewId }
			})
			return { success: true, message: 'review deleted', statusCode: 200 }
		} catch (error) {
			throw new NotImplementedException(
				`Couldn't delete review, error code: ${error.code}`
			)
		}
	}
}
