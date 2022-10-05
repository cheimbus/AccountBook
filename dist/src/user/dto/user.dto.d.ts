import { Users } from 'src/entities/Users';
declare const UserDto_base: import("@nestjs/common").Type<Pick<Users, "id" | "email" | "password">>;
export declare class UserDto extends UserDto_base {
}
export {};
