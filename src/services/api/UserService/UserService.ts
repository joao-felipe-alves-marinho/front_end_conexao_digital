import Api from '../Api';

export interface IUser {
    avatar: string | undefined;
    interesses: {
        id: number;
        nome: string;
    }[];
    habilidades: {
        id: number;
        nome: string;
        nivel: number;
    }[];
    formacoes_academicas: {
        id: number;
        curso: string;
        instituicao: string;
        ano_inicio: number;
        ano_conclusao: number;
        semestre: number;
    }[];
    experiencias_profissionais: {
        id: number;
        cargo: string;
        empresa: string;
        ano_inicio: number;
        ano_fim?: number;
        descricao?: string;
    }[];
    projetos: {
        id: number;
        nome: string;
        link: string;
    }[];
    id: number;
    nome: string;
    email: string;
    idade: number;
    genero: 'M' | 'F' | 'O';
    telefone: string;
    deficiencia: boolean;
    resumo: string;
}

type TFromUser = Pick<IUser, 'id' | 'nome' | 'email'>

export interface ICreateUserPayload {
    email: string;
    nome: string;
    password: string;
    idade: number;
    genero: 'M' | 'F' | 'O';
    telefone: string;
    deficiencia?: boolean;
    resumo?: string;
    avatar?: string;
}

export type TUpdateUserPayload = Partial<Omit<ICreateUserPayload, 'password'>>;

export interface IInteresse {
    id: number;
    nome: string;
    user: TFromUser;
}

type TCreateOrUpdateInteressePayload = Pick<IInteresse, 'nome'>;

export interface IHabilidade {
    id: number;
    nome: string;
    nivel: number;
    user: TFromUser;
}

type TCreateOrUpdateHabilidadePayload = Pick<IHabilidade, 'nome' | 'nivel'>;


export interface IFormacaoAcademica {
    id: number;
    curso: string;
    instituicao: string;
    ano_inicio: number;
    ano_conclusao: number;
    semestre: number;
    user: TFromUser;
}

type TCreateOrUpdateFormacaoAcademicaPayload = Pick<IFormacaoAcademica, 'curso' | 'instituicao' | 'ano_inicio' | 'ano_conclusao' | 'semestre'>;

export interface IExperienciaProfissional {
    id: number;
    cargo: string;
    empresa: string;
    ano_inicio: number;
    ano_fim?: number | undefined;
    descricao?: string;
    user: TFromUser;
}

type TCreateOrUpdateExperienciaProfissionalPayload = Pick<IExperienciaProfissional, 'cargo' | 'empresa' | 'ano_inicio' | 'ano_fim' | 'descricao'>;

export interface IProjeto {
    id: number;
    nome: string;
    descricao?: string;
    link: string;
    user: TFromUser;
}

type TCreateOrUpdateProjetoPayload = Pick<IProjeto, 'nome' | 'descricao' | 'link'>;


// Create New User
export const createUser = async (payload: ICreateUserPayload) => {
    const response = await Api.post('/admin/users', payload);

    if (response.status === 201) {
        const data: IUser = response.data;
        return data;
    }
};

// User
export const getMe = async () => {
    const response = await Api.get('/me');

    if (response.status === 200) {
        const data: IUser = response.data;
        return data;
    }
};

export const updateUser = async (payload: TUpdateUserPayload) => {
    const response = await Api.put('/me', payload);

    if (response.status === 200) {
        const data: IUser = response.data;
        return data;
    }
};

export const deleteUser = async () => {
    const response = await Api.delete('/me');

    if (response.status === 204) {
        return;
    }
};

// User Interesses
export const createInteresse = async (payload: TCreateOrUpdateInteressePayload) => {
    const response = await Api.post('/me/interesses', payload);

    if (response.status === 200) {
        const data: IInteresse = response.data;
        return data;
    }
};

export const getInteresses = async () => {
    const response = await Api.get('/me/interesses');

    if (response.status === 200) {
        const data: IInteresse[] = response.data;
        return data;
    }
};

export const deleteInteresse = async (interesse_id: number) => {
    const response = await Api.delete(`/me/interesses/${interesse_id}`);

    if (response.status === 204) {
        return;
    }
};

// User Habilidades
export const createHabilidade = async (payload: TCreateOrUpdateHabilidadePayload) => {
    const response = await Api.post('/me/habilidades', payload);

    if (response.status === 200) {
        const data: IHabilidade = response.data;
        return data;
    }
};

export const getHabilidades = async () => {
    const response = await Api.get('/me/habilidades');

    if (response.status === 200) {
        const data: IHabilidade[] = response.data;
        return data;
    }
};

export const updateHabilidade = async (habilidade_id: number, payload: TCreateOrUpdateHabilidadePayload) => {
    const response = await Api.put(`/me/habilidades/${habilidade_id}`, payload);

    if (response.status === 200) {
        const data: IHabilidade = response.data;
        return data;
    }
};

export const deleteHabilidade = async (habilidade_id: number) => {
    const response = await Api.delete(`/me/habilidades/${habilidade_id}`);

    if (response.status === 204) {
        return;
    }
};

// User Formacoes Academicas
export const createFormacaoAcademica = async (payload: TCreateOrUpdateFormacaoAcademicaPayload) => {
    const response = await Api.post('/me/formacoes-academicas', payload);

    if (response.status === 200) {
        const data: IFormacaoAcademica = response.data;
        return data;
    }
};

export const getFormacoesAcademicas = async () => {
    const response = await Api.get('/me/formacoes-academicas');

    if (response.status === 200) {
        const data: IFormacaoAcademica[] = response.data;
        return data;
    }
};

export const updateFormacaoAcademica = async (formacao_academica_id: number, payload: TCreateOrUpdateFormacaoAcademicaPayload) => {
    const response = await Api.put(`/me/formacoes-academicas/${formacao_academica_id}`, payload);

    if (response.status === 200) {
        const data: IFormacaoAcademica = response.data;
        return data;
    }
};

export const deleteFormacaoAcademica = async (formacao_academica_id: number) => {
    const response = await Api.delete(`/me/formacoes-academicas/${formacao_academica_id}`);

    if (response.status === 204) {
        return;
    }
};

// User Experiencias Profissionais
export const createExperienciaProfissional = async (payload: TCreateOrUpdateExperienciaProfissionalPayload) => {
    const response = await Api.post('/me/experiencias-profissionais', payload);

    if (response.status === 200) {
        const data: IExperienciaProfissional = response.data;
        return data;
    }
};

export const getExperienciasProfissionais = async () => {
    const response = await Api.get('/me/experiencias-profissionais');

    if (response.status === 200) {
        const data: IExperienciaProfissional[] = response.data;
        return data;
    }
};

export const updateExperienciaProfissional = async (experiencia_profissional_id: number, payload: TCreateOrUpdateExperienciaProfissionalPayload) => {
    const response = await Api.put(`/me/experiencias-profissionais/${experiencia_profissional_id}`, payload);

    if (response.status === 200) {
        const data: IExperienciaProfissional = response.data;
        return data;
    }
};

export const deleteExperienciaProfissional = async (experiencia_profissional_id: number) => {
    const response = await Api.delete(`/me/experiencias-profissionais/${experiencia_profissional_id}`);

    if (response.status === 204) {
        return;
    }
};

// User Projetos
export const createProjeto = async (payload: TCreateOrUpdateProjetoPayload) => {
    const response = await Api.post('/me/projetos', payload);

    if (response.status === 200) {
        const data: IProjeto = response.data;
        return data;
    }
};

export const getProjetos = async () => {
    const response = await Api.get('/me/projetos');

    if (response.status === 200) {
        const data: IProjeto[] = response.data;
        return data;
    }
};

export const updateProjeto = async (projeto_id: number, payload: TCreateOrUpdateProjetoPayload) => {
    const response = await Api.put(`/me/projetos/${projeto_id}`, payload);

    if (response.status === 200) {
        const data: IProjeto = response.data;
        return data;
    }
};

export const deleteProjeto = async (projeto_id: number) => {
    const response = await Api.delete(`/me/projetos/${projeto_id}`);

    if (response.status === 204) {
        return;
    }
};