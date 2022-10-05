import { Users } from 'src/entities/Users';
declare const CreateUserDto_base: import("@nestjs/common").Type<Pick<Users, "email" | "nickname" | "password">>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};
