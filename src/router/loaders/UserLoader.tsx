// loaders/getMeLoader.ts
import { getMe } from '../../services/api/UserService/UserService';

export const UserLoader = async () => {
    try {
        const user = await getMe();
        return user;  // Retorna os dados do usuário se encontrados
    } catch (error) {
        const user = await getMe();
        if (user) {
            return user;  // Retorna os dados do usuário se encontrados
        }
        return null;
        console.error(error);
    }
};
