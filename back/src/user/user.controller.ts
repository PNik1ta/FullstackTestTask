import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { BaseResponse } from "../shared/classes/base-response";
import { User } from "./models/user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ElasticsearchLoggerService } from "../elastic-search-logger.service";

@Controller('user')
@ApiTags('user')
export class UserContoller {
	constructor(
		private readonly userService: UserService,
		private readonly loggerService: ElasticsearchLoggerService
	) {}

	@ApiOkResponse({
		description: 'Created user',
		type: BaseResponse<User>
	})
	@Post()
	@HttpCode(201)
	async create(@Body() dto: CreateUserDto): Promise<BaseResponse<User>> {
		try {
			return this.userService.create(dto);
		} catch(error) {
			this.loggerService.error(error, 'error');
		}
	}

	@ApiOkResponse({
		description: 'All users',
		type: BaseResponse<User[]>,
	})
	@Get()
	@HttpCode(200)
	async findAll(): Promise<BaseResponse<User[]>> {
		try {
			return this.userService.findAll();
		} catch (error) {
			this.loggerService.error(error, 'error');
		}
	}

	@ApiOkResponse({
		description: 'user by email and phone',
		type: BaseResponse<User>,
	})
	@Get('find-by-email-and-phone')
	@HttpCode(200)
	async findByEmailAndPhone(@Query('email') email: string, @Query('phone') phone: string): Promise<BaseResponse<User>> {
		try {
			return this.userService.findByEmailAndPhone(email, phone);
		} catch (error) {
			this.loggerService.error(error, 'error');
		}
	}

	@ApiOkResponse({
		description: 'user by id',
		type: BaseResponse<User>,
	})
	@Get('/:id')
	@HttpCode(200)
	async findById(@Param('id') id: string): Promise<BaseResponse<User>> {
		try {
			return this.userService.findById(id);
		} catch (error) {
			this.loggerService.error(error, 'error');
		}
	}

	@ApiOkResponse({
		description: 'user by email',
		type: BaseResponse<User>,
	})
	@Get('find-by-email/:email')
	@HttpCode(200)
	async findByEmail(@Param('email') email: string): Promise<BaseResponse<User>> {
		try {
			return this.userService.findByEmail(email);
		} catch (error) {
			this.loggerService.error(error, 'error');
		}
	}

	@ApiOkResponse({
		description: 'Deleted user',
		type: BaseResponse<User>,
	})
	@Delete('/:id')
	@HttpCode(200)
	async delete(@Param('id') id: string): Promise<BaseResponse<User>> {
		try {
			return this.userService.delete(id);
		} catch (error) {
			this.loggerService.error(error, 'error');
		}
	}

	@ApiOkResponse({
		description: 'Updated user',
		type: BaseResponse<User>,
	})
	@Patch('/:id')
	@HttpCode(200)
	async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<BaseResponse<User>> {
		try {
			return this.userService.update(id, dto);
		} catch (error) {
			this.loggerService.error(error, 'error');
		}
	}
}