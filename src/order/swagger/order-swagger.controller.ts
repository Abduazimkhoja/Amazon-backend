import { applyDecorators } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam
} from '@nestjs/swagger'
import { OrderDto } from '../order.dto'
import { PaymentStatusDto } from '../payment-status.dto'

const getAllOrdersSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get All Orders',
			description: 'Endpoint to get all orders'
		}),
		ApiOkResponse({
			description: 'All orders retrieved successfully',
			type: [OrderDto]
		})
	)

const getOrdersByUserIdSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Get Orders by User ID',
			description: 'Endpoint to get orders by user ID'
		}),
		ApiParam({ name: 'userId', description: 'ID of the user', type: Number }),
		ApiOkResponse({
			description: 'Orders retrieved successfully',
			type: [OrderDto]
		})
	)

const placeOrderSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Place Order',
			description: 'Endpoint to place a new order'
		}),
		ApiBody({ description: 'Order DTO', type: OrderDto }),
		ApiOkResponse({ description: 'Order placed successfully', type: OrderDto }),
		ApiBadRequestResponse({ description: 'Invalid order data' })
	)

const updateOrderStatusSwaggerDecorator = () =>
	applyDecorators(
		ApiOperation({
			summary: 'Update Order Status',
			description: 'Endpoint to update order status'
		}),
		ApiBody({ description: 'Payment Status DTO', type: PaymentStatusDto }),
		ApiOkResponse({
			description: 'Order status updated successfully',
			type: OrderDto
		}),
		ApiBadRequestResponse({ description: 'Invalid status data' })
	)

export const OrderSwaggerControllerDecorators = {
	getAll: getAllOrdersSwaggerDecorator,
	getByUserId: getOrdersByUserIdSwaggerDecorator,
	placeOrder: placeOrderSwaggerDecorator,
	updateStatus: updateOrderStatusSwaggerDecorator
}
