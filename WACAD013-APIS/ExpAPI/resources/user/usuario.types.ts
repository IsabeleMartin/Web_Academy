import { User } from "@prisma/client"
type CreateUserDto = Pick<User, 'name'|'email'|'password'|'userTypeId'>
type UserDto = Pick<User, 'id'|'name'|'email'|'userTypeId'|'createdAt'|'updatedAt'>
type UpdateUserDto = Pick<User, 'name'|'password'|'userTypeId'>

export { CreateUserDto, UpdateUserDto, UserDto}