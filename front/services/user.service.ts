import axios, { AxiosResponse, CancelToken, CancelTokenSource } from "axios";
import { BaseResponse } from "../core/classes/base-response";
import { IUser } from "../core/interfaces/user.interface";
import { CreateUserDto } from "../core/dto/create-user.dto";
import { UpdateUserDto } from "../core/dto/update-user.dto";

export default class UserService {

	static async getUsers(): Promise<AxiosResponse<BaseResponse<IUser[]>>> {
		try {
			return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
		} catch (err) {
			throw new Error('Failed to get users');
		}
	}

	static async getUserById(id: string): Promise<AxiosResponse<BaseResponse<IUser>>> {
		try {
			return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
		} catch (err) {
			throw new Error('Failed to get user by id');
		}
	}

	static async getUserByEmail(email: string): Promise<AxiosResponse<BaseResponse<IUser>>> {
		try {
			return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/find-by-email/${email}`);
		} catch (err) {
			throw new Error('Failed to get user by email');
		}
	}

	static async getUserByEmailAndPhone(email: string, phone: string, cancelTokenSource?: CancelTokenSource): Promise<AxiosResponse<BaseResponse<IUser>>> {
		try {
			return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/find-by-email-and-phone`, {
				params: {
					email,
					phone
				},
				cancelToken: cancelTokenSource ? cancelTokenSource.token : undefined
			});
		} catch (err) {
			if (axios.isCancel(err)) {
				throw new Error('Request canceled');
			} else {
				throw new Error('Failed to get user by email and phone');
			}
		}
	}

	static async createUser(dto: CreateUserDto): Promise<AxiosResponse<BaseResponse<IUser>>> {
		try {
			return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, dto);
		} catch (err) {
			throw new Error('Failed to get user by id');
		}
	}

	static async deleteUser(id: string): Promise<AxiosResponse<BaseResponse<IUser>>> {
		try {
			return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
		} catch (err) {
			throw new Error('Failed to get user by id');
		}
	}

	static async updateUser(id: string, dto: UpdateUserDto): Promise<AxiosResponse<BaseResponse<IUser>>> {
		try {
			return axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, dto);
		} catch (err) {
			throw new Error('Failed to get user by id');
		}
	}
}