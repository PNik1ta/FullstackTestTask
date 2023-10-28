export class CreateUserDto {
	email: string;
	phone?: number;

	constructor(email: string, phone?: number) {
		this.email = email;
		this.phone = phone;
	}
}