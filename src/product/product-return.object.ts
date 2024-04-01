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
	slug: true,
	reviews: {
		select: returnReviewObject,
		orderBy: { createdAt: 'desc' }
	},
	category: { select: returnCategoryObject }
}

export const returnProductObjectMinify: Prisma.ProductSelect = {
	id: true,
	name: true,
	slug: true,
	images: true,
	price: true,
	reviews: { select: { rating: true } },
	category: { select: { slug: true } }
}

export const returnProductObjectFullest: Prisma.ProductSelect = {
	...returnProductObject
}
