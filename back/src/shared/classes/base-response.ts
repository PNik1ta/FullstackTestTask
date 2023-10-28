import { ApiProperty } from "@nestjs/swagger";

export class BaseResponse<T> {
	@ApiProperty({
		description: 'Message of response from server'
	})
	message: string;
	
	@ApiProperty({
		description: 'Date of response from server'
	})
	date: Date;

	@ApiProperty({
		description: 'Data in response from server'
	})
	data?: T;

	constructor(message: string, data?: T) {
		 this.message = message;
		 this.data = data;
		 this.date = new Date();
	}
}