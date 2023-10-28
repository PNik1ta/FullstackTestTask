import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../models/user.model";
import { Model } from "mongoose";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) { }

	async create(user: UserEntity): Promise<User> {
		const newUser = new this.userModel(user);
		return newUser.save();
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async findByEmail(email: string): Promise<User> {
		return this.userModel.findOne({ email }).exec();
	}

	async findByEmailAndPhone(email: string, phone: string): Promise<User> {
		return this.userModel.findOne({ email, phone }).exec();
	}

	async findById(id: string): Promise<User> {
		return this.userModel.findById(id).exec();
	}

	async delete(id: string): Promise<any> {
		return this.userModel.deleteOne({ _id: id }).exec();
	}

	async update({ _id, ...rest }: UserEntity): Promise<any> {
		return this.userModel.updateOne({ _id }, { $set: { ...rest }});
	}
}