import { Module } from "@nestjs/common";
import { UserContoller } from "./user.controller";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models/user.model";
import { ElasticsearchLoggerService } from "../elastic-search-logger.service";

@Module({
	controllers: [UserContoller],
	providers: [UserRepository, UserService, ElasticsearchLoggerService],
	imports: [MongooseModule.forFeature([
		{ name: User.name, schema: UserSchema }
	])]
})
export class UserModule { }