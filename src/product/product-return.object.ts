import { Prisma } from '@prisma/client'
import { returnReviewObject } from '../review/review-return.object'
import { returnCategoryObject } from 'src/category/category-return.object'

export const returnProductObject: Prisma.ProductSelect = {
	images: true,
	description: true,
	id: true,
	name: true,
	price: true,
	createdAt: true,
	slug: true
}

export const returnProductObjectFullest: Prisma.ProductSelect = {
	...returnProductObject,
	reviews: { select: returnReviewObject },
	category: { select: returnCategoryObject }
}
