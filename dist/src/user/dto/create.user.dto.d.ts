import { User } from 'src/entities/User';
declare const CreateUserDto_base: import("@nestjs/common").Type<Pick<User, "password" | "email" | "nickname">>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};
