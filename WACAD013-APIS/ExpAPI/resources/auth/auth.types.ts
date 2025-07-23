import { User } from '@prisma/client';
type LoginDto = Pick<User,'email'|'password'>;
type SignUpDto = Pick<User,'name'|'email'|'password'>;

export { LoginDto, SignUpDto}

