import { faker } from '@faker-js/faker'
import { PrismaClient, Product } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const createUniqueProduct = async () => {
	let product: Product | null = null
	let attempts = 0
	const maxAttempts = 4 // Максимальное количество попыток

	while (!product && attempts < maxAttempts) {
		const productName = faker.commerce.productName()
		const categoryName = faker.commerce.department()

		try {
			product = await prisma.product.create({
				data: {
					name: productName,
					slug: faker.helpers.slugify(productName).toLowerCase(),
					description: faker.commerce.productDescription(),
					price: Number(faker.commerce.price(10, 999, 0)),
					images: Array.from({
						length: faker.number.int({ min: 2, max: 6 })
					}).map(() => faker.image.url({ width: 500, height: 500 })),
					category: {
						create: {
							name: categoryName,
							slug: faker.helpers.slugify(categoryName).toLowerCase()
						}
					},
					reviews: {
						create: [
							{
								rating: faker.number.int({ min: 1, max: 5 }),
								text: faker.lorem.paragraph(),
								user: { connect: { id: 1 } }
							},
							{
								rating: faker.number.int({ min: 1, max: 5 }),
								text: faker.lorem.paragraph(),
								user: { connect: { id: 1 } }
							}
						]
					}
				}
			})
		} catch (error) {
			// Перехватываем ошибку уникальности и печатаем предупреждение
			console.warn(
				`❌- Failed to create product with name "${productName}". 🔄️ - Retrying...`
			)

			// Увеличиваем счетчик попыток
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

	console.log(`Created ${products.length} products`)
}

async function main() {
	const args = Number(process.argv.slice(2))
	console.log(`Start seeding-${args}...`)
	await createProducts(args || 2)
}

main()
	.catch(e => console.error('ERROR❌❌❌', e, 'ERROR❌❌❌'))
	.finally(async () => {
		await prisma.$disconnect()
	})
