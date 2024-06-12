import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ReviewDto } from './review.dto'
import { ReviewService } from './review.service'

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
	constructor(private reviewService: ReviewService) {}

	// get All
	@Get()
	@Auth('admin')
	async getAll() {
		return this.reviewService.getAll()
	}

	// get by id
	@Get(':id')
	@Auth('admin')
	async getReview(@Param('id') id: string) {
		return this.reviewService.byId(Number(id))
	}

	// average-by-product
	@Get('average-by-product/:productId')
	async getAverageByProduct(@Param('productId') productId: string) {
		return this.reviewService.getAverageValueByProductId(+productId)
	}

	// create Review
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post(':productId')
	@Auth('user')
	async createReview(
		@CurrentUser('id') id: number,
		@Body() dto: ReviewDto,
		@Param('productId') productId: string
	) {
		return this.reviewService.create(id, dto, Number(productId))
	}

	// update Review
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':reviewId')
	@Auth('user')
	async update(
		@CurrentUser('id') id: number,
		@Body() dto: ReviewDto,
		@Param('reviewId') reviewId: string
	) {
		return this.reviewService.update(id, dto, Number(reviewId))
	}

	// Delete
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth()
	@Delete(':reviewId')
	async delete(
		@CurrentUser('id') userId: number,
		@Param('reviewId') reviewId: string
	) {
		return this.reviewService.delete(userId, Number(reviewId))
	}
}
