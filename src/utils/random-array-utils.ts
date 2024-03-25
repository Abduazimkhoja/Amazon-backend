import { faker } from '@faker-js/faker'

export const generateRandomArray = (min = 1, max = 6, count = 0) => {
	return Array.from({
		length: count || faker.number.int({ min, max })
	})
}
