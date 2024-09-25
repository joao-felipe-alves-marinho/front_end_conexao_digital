import { getMe } from '../../services/api/userService/UserService';

export function UserLoader() {
    const user = getMe();
    return user;
}