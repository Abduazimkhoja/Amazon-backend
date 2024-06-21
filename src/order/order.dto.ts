import { EnumOrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	ValidateNested
} from 'class-validator'
import { OrderSwaggerDtoDecorators } from './swagger/order-swagger.dto'

export class OrderDto {
	@IsOptional()
	@IsEnum(EnumOrderStatus)
	@OrderSwaggerDtoDecorators.status
	status: EnumOrderStatus

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	@OrderSwaggerDtoDecorators.items
	items: OrderItemDto[]
}

export class OrderItemDto {
	@IsNumber()
  @OrderSwaggerDtoDecorators.quantity
	quantity: number

	@IsNumber()
  @OrderSwaggerDtoDecorators.price
	price: number

	@IsNumber()
  @OrderSwaggerDtoDecorators.productId
	productId: number
}
