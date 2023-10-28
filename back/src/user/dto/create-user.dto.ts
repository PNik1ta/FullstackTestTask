import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserDto {
	@ApiProperty({
		description: 'User email'
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		description: 'User phone',
		required: false
	})
	@IsNumber()
	phone?: number;
}