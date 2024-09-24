import Api from "../Api";

interface IUser {
    id: number;
    last_login: string;
    email: string;
    nome: string;
    idade: number;
    genero: string;
    telefone: string;
    deficiencia: boolean;
    resumo: string | null;
    avatar: string | null;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
    groups: string[];
    user_permissions: string[];
}

interface ILoginPayload {
    username: string;
    password: string;
}

interface ILoginResponse {
    access: string;
    refresh: string;
    message: string;
    user: IUser;
}

interface ILogoutResponse {
    message: string;
}

export const loginUser = async (payload: ILoginPayload) => {
    const response = await Api.post("/auth/login", payload);

    if (response.status === 200) {
        const data: ILoginResponse = response.data;
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        return data.user;
    }
};

export const logoutUser = async () => {
    const response = await Api.post("/auth/logout");

    if (response.status === 200) {
        const data: ILogoutResponse = response.data;
        return data;
    }
};



