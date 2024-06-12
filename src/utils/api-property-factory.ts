import { ApiProperty } from '@nestjs/swagger'

export function ApiPropertyFactory<TExample = string>(
	description: string,
	example: TExample
) {
	return ApiProperty({ description, example })
}
