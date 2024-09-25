import Api from '../Api';

interface IUser {
    avatar: string;
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
        ano_fim: number;
        descricao: string;
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
    genero: string;
    telefone: string;
    deficiencia: boolean;
    resumo: string;
}

type FromUser = Pick<IUser, 'id' | 'nome' | 'email'>

export interface ICreateUserPayload {
    email: string;
    nome: string;
    password: string;
    idade: number;
    genero: 'M' | 'F' | 'O'
    telefone: string;
    deficiencia?: boolean;
    resumo?: string;
    avatar?: string;
}

type IUpdateUserPayload = Partial<Omit<ICreateUserPayload, 'password'>>;

interface IInteresse {
    id: number;
    nome: string;
    user: FromUser;
}

type ICreateOrUpdateInteressePayload = Pick<IInteresse, 'nome'>;

interface IHabilidade {
    id: number;
    nome: string;
    nivel: number;
    user: FromUser;
}

type ICreateOrUpdateHabilidadePayload = Pick<IHabilidade, 'nome' | 'nivel'>;


interface IFormacaoAcademica {
    id: number;
    curso: string;
    instituicao: string;
    ano_inicio: number;
    ano_conclusao: number;
    semestre: number;
    user: FromUser;
}

type ICreateOrUpdateFormacaoAcademicaPayload = Pick<IFormacaoAcademica, 'curso' | 'instituicao' | 'ano_inicio' | 'ano_conclusao' | 'semestre'>;

interface IExperienciaProfissional {
    id: number;
    cargo: string;
    empresa: string;
    ano_inicio: number;
    ano_fim: number;
    descricao: string;
    user: FromUser;
}

type ICreateOrUpdateExperienciaProfissionalPayload = Pick<IExperienciaProfissional, 'cargo' | 'empresa' | 'ano_inicio' | 'ano_fim' | 'descricao'>;

interface IProjeto {
    id: number;
    nome: string;
    descricao: string;
    link: string;
    user: FromUser;
}

type ICreateOrUpdateProjetoPayload = Pick<IProjeto, 'nome' | 'descricao' | 'link'>;


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

export const updateUser = async (payload: IUpdateUserPayload) => {
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
export const createInteresse = async (payload: ICreateOrUpdateInteressePayload) => {
    const response = await Api.post('/me/interesses', payload);

    if (response.status === 201) {
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
export const createHabilidade = async (payload: ICreateOrUpdateHabilidadePayload) => {
    const response = await Api.post('/me/habilidades', payload);

    if (response.status === 201) {
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

export const updateHabilidade = async (habilidade_id: number, payload: ICreateOrUpdateHabilidadePayload) => {
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
export const createFormacaoAcademica = async (payload: ICreateOrUpdateFormacaoAcademicaPayload) => {
    const response = await Api.post('/me/formacoes-academicas', payload);

    if (response.status === 201) {
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

export const updateFormacaoAcademica = async (formacao_academica_id: number, payload: ICreateOrUpdateFormacaoAcademicaPayload) => {
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
export const createExperienciaProfissional = async (payload: ICreateOrUpdateFormacaoAcademicaPayload) => {
    const response = await Api.post('/me/experiencias-profissionais', payload);

    if (response.status === 201) {
        const data: IFormacaoAcademica = response.data;
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

export const updateExperienciaProfissional = async (experiencia_profissional_id: number, payload: ICreateOrUpdateExperienciaProfissionalPayload) => {
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
export const createProjeto = async (payload: ICreateOrUpdateProjetoPayload) => {
    const response = await Api.post('/me/projetos', payload);

    if (response.status === 201) {
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

export const updateProjeto = async (projeto_id: number, payload: ICreateOrUpdateProjetoPayload) => {
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