import { CreateUserRequest, CreateUserResponse } from "./create-user.dto";

export interface ICreateUserUseCase {
    execute(data: CreateUserRequest): Promise<CreateUserResponse>;
}
