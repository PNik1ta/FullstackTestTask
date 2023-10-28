import { IUser } from "../../shared/interfaces/user.interface";

export class UserEntity implements IUser {
	_id?: string;
	email: string;
	phone?: number;

	constructor(user: IUser) {
		this.email = user.email;
		this.phone = user.phone;
	}
}