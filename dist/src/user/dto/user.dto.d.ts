import { User } from 'src/entities/User';
declare const UserDto_base: import("@nestjs/common").Type<Pick<User, "id" | "password" | "email">>;
export declare class UserDto extends UserDto_base {
}
export {};
