import { Prisma } from '@prisma/client'
import { returnReviewObject } from '../review/review-return.object'
import { returnCategoryObject } from 'src/category/category-return.object'

export const productReturnObject: Prisma.ProductSelect = {
	images: true,
	description: true,
	id: true,
	name: true,
	price: true,
	createdAt: true,
	slug: true
}

export const productReturnObjectFullest: Prisma.ProductSelect = {
	...productReturnObject,
	reviews: { select: returnReviewObject },
	category: { select: returnCategoryObject }
}
