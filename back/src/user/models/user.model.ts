import { IUser } from "../../shared/interfaces/user.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document implements IUser {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop()
	phone?: number;
};

export const UserSchema = SchemaFactory.createForClass(User);