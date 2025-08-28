// userUtils.ts
import { User } from '../test-data/users';
import { users } from '../test-data/usersClass';

/**
 * Find a user by role or username.
 * @param params The search parameters.
 * @param params.role The role of the user to find.
 * @param params.username The username of the user to find.
 * @returns A user object if found, otherwise undefined.
 */
export function findUser({ role, username }: { role?: string; username?: string }): User | undefined {
  return users.find(user => (role && user.role === role) && (username && user.username === username));
}