// loaders/getMeLoader.ts
import { getMe } from '../../services/api/userService/UserService'; 

export const UserLoader = async () => {
    try {
        const user = await getMe();
        console.log(user);
        return user;  // Retorna os dados do usuário se encontrados
    } catch (error) {
        console.error("Failed to load user", error);
        return null;  // Retorna null se não encontrar o usuário
    }
};
