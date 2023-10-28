import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { BaseResponse } from "../shared/classes/base-response";
import { User } from "./models/user.model";
import { UserEntity } from "./entities/user.entity";
import { USER_CREATE_ERROR, USER_FIND_ERROR, USER_UPDATE_ERROR } from "../shared/errors/user.errors";
import { USER_CREATE, USER_DELETED, USER_FIND_ALL, USER_FIND_ONE, USER_UPDATED } from "../shared/messages/user.messages";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository
	) { }

	async create(dto: CreateUserDto): Promise<BaseResponse<User>> {
		const entity: UserEntity = new UserEntity({
			...dto
		});

		const createdUser = await this.userRepository.create(entity);

		if (!createdUser) {
			throw new Error(USER_CREATE_ERROR);
		}

		return new BaseResponse<User>(USER_CREATE, createdUser);
	}

	async findAll(): Promise<BaseResponse<User[]>> {
		const users = await this.userRepository.findAll();

		if (!users) {
			throw new Error(USER_FIND_ERROR);
		}

		return new BaseResponse<User[]>(USER_FIND_ALL, users);
	}

	async findByEmail(email: string): Promise<BaseResponse<User>> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			return new BaseResponse<User>(USER_FIND_ERROR);
		}

		return new BaseResponse<User>(USER_FIND_ONE, user);
	}

	async findByEmailAndPhone(email: string, phone: string): Promise<BaseResponse<User>> {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				try {
					const user = await this.userRepository.findByEmailAndPhone(email, phone);
					let response;

					if (!user) {
						response = new BaseResponse<User>(USER_FIND_ERROR);
					} else {
						response = new BaseResponse<User>(USER_FIND_ONE, user);
					}

					
					resolve(response);
				} catch (error) {
					reject(error);
				}
			}, 5000);
		});
	}

	async findById(id: string): Promise<BaseResponse<User>> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new Error(USER_FIND_ERROR);
		}

		return new BaseResponse<User>(USER_FIND_ONE, user);
	}

	async delete(id: string): Promise<BaseResponse<User>> {
		const user = this.userRepository.findById(id);

		if (!user) {
			throw new Error(USER_FIND_ERROR);
		}
		await this.userRepository.delete(id);
		return new BaseResponse<User>(USER_DELETED);
	}

	async update(id: string, dto: UpdateUserDto) {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new Error(USER_FIND_ERROR);
		}

		const userEntity = new UserEntity(user);
		userEntity.email = dto.email;
		userEntity.phone = dto.phone;

		const updatedUser = await this.userRepository.update(userEntity);

		if (!updatedUser) {
			throw new Error(USER_UPDATE_ERROR);
		}

		return new BaseResponse<User>(USER_UPDATED);
	}
}