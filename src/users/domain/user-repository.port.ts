import { User } from './user.entity';

export abstract class UserRepositoryPort {
  abstract create(user: User): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
}
