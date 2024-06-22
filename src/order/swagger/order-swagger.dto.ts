import { ApiProperty } from '@nestjs/swagger'
import { EnumOrderStatus } from '@prisma/client'
import { OrderItemDto } from '../order.dto'

// Order DTO
const OrderStatusSwaggerDto = ApiProperty({
	description: 'Status of the order',
	example: 'Pending',
	enum: EnumOrderStatus, // Assuming EnumOrderStatus is defined
	required: false
})

const OrderItemsSwaggerDto = ApiProperty({
	description: 'Items in the order',
	type: [OrderItemDto]
})

// Order Item DTO
const OrderItemQuantitySwaggerDto = ApiProperty({
	description: 'Quantity of the item',
	example: 2
})

const OrderItemPriceSwaggerDto = ApiProperty({
	description: 'Price of the item',
	example: 50.99
})

const OrderItemProductIdSwaggerDto = ApiProperty({
	description: 'Product ID of the item',
	example: 1
})

export const OrderSwaggerDtoDecorators = {
	status: OrderStatusSwaggerDto,
	items: OrderItemsSwaggerDto,
	quantity: OrderItemQuantitySwaggerDto,
	price: OrderItemPriceSwaggerDto,
	productId: OrderItemProductIdSwaggerDto
}
