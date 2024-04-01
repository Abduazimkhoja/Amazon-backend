import { faker } from '@faker-js/faker'
import { Prisma, PrismaClient, Product } from '@prisma/client'
import * as dotenv from 'dotenv'
import { generateRandomArray } from '../src/utils/random-array-utils'

dotenv.config()
const prisma = new PrismaClient()

async function connectCategory(categoryName: string) {
	const slug = faker.helpers.slugify(categoryName).toLowerCase()

	const categoryId = await prisma.category.findUnique({
		where: { slug },
		select: { id: true }
	})

	// надо проверить естьли категория иначе подключить к id
	if (categoryId) return { connect: { id: categoryId.id } }

	return {
		create: {
			name: categoryName,
			slug
		}
	}
}

async function createUniqueProduct() {
	let product: Product | null = null
	let attempts = 0
	const maxAttempts = 4 // Максимальное количество попыток

	while (!product && attempts < maxAttempts) {
		const usersLength = 4

		// random
		const randomUserConnect = {
			connect: { id: faker.number.int({ min: 1, max: usersLength }) }
		}
		const randomImageUrl = () =>
			`/uploads/(${faker.number.int({ min: 1, max: 76 })}).jpg`

		// fake product data item
		const fakeName = faker.commerce.productName()
		const fakeSlug = faker.helpers.slugify(fakeName).toLowerCase()
		const fakeDescription = faker.commerce.productDescription()
		const fakePrice = Number(
			faker.commerce.price({ min: 1, max: 10000, dec: 0 })
		)
		const fakeImages = generateRandomArray(2, 6).map(() => randomImageUrl())
		const fakeCategory = faker.commerce.department()
		const fakeReviews = {
			create: generateRandomArray(1, 6).map(() => {
				const review = {
					rating: faker.number.int({ min: 0, max: 5 }),
					text: faker.lorem.paragraph(),
					user: randomUserConnect
				}

				return review
			})
		}

		// Create fake data
		try {
			product = await prisma.product.create({
				data: {
					name: fakeName,
					slug: fakeSlug,
					description: fakeDescription,
					price: fakePrice,
					images: fakeImages,
					category: await connectCategory(fakeCategory),
					reviews: fakeReviews,
          user: randomUserConnect
				}
			})
		} catch (error) {
			if (`${error.code}` == 'P2025') {
				throw new Error(
					`❓ - 👤 User not found!\n Min user count: ${usersLength}`
				)
			}
			attempts++
		}
	}

	return product
}

const createProducts = async (quantity: number) => {
	const products: Product[] = []

	for (let i = 0; i < quantity; i++) {
		const product = await createUniqueProduct()
		if (product) {
			products.push(product)
		}
	}

	console.log(
		`Created ${products.length} products. Fails: ${quantity - products.length}`
	)
}

async function main() {
	const args = Number(process.argv.slice(2))
	console.log(`Start seeding-${args}...`)
	await createProducts(args || 2)
}

main()
	.catch(e => console.error('ERROR❌❌❌\n', e, '\nERROR❌❌❌'))
	.finally(async () => {
		await prisma.$disconnect()
	})
