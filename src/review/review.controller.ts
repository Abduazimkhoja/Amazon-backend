import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ReviewDto } from './review.dto'
import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
	constructor(private reviewService: ReviewService) {}

	// get All
	@Get()
	@Auth('admin')
	async getAll() {
		return this.reviewService.getAll()
	}

	// create Review
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('leave/:productId')
	@Auth('user')
	async leaveReview(
		@CurrentUser('id') id: number,
		@Body() dto: ReviewDto,
		@Param('productId') productId: string
	) {
		return this.reviewService.create(id, dto, Number(productId))
	}

	// update Review
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('update/:reviewId')
	@Auth('user')
	async update(
		@CurrentUser('id') id: number,
		@Body() dto: ReviewDto,
		@Param('reviewId') reviewId: string
	) {
		return this.reviewService.update(id, dto, Number(reviewId))
	}

	//
	@Get('average-by-product/:productId')
	async getAverageByProduct(@Param('productId') productId: string) {
		return this.reviewService.getAverageValueByProductId(+productId)
	}
}
