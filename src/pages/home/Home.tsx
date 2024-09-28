import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Divider, Fab, Icon, Stack, Tooltip, Typography } from '@mui/material';

import { IUserContext } from '../../layouts/BaseAuth';
import { AddInteresse, EditResumo, EditUser, ExperienciasProfissionais, FormacoesAcademicas, Habilidades, Interesses, Projetos, } from './HomeComponents';
import { logoutUser } from '../../services/api/authService/AuthService';


export const Home = () => {
    const { user, setUser } = useOutletContext<IUserContext>();

    const [interesses, setInteresses] = useState(user?.interesses || []);
    const [habilidades, setHabilidades] = useState(user?.habilidades || []);
    const [formacoesAcademicas, setFormacoesAcademicas] = useState(user?.formacoes_academicas || []);
    const [experienciasProfissionais, setExperienciasProfissionais] = useState(user?.experiencias_profissionais || []);
    const [projetos, setProjetos] = useState(user?.projetos || []);

    if (!user) {
        return <p>User not found or not logged in.</p>;
    }
    return (
        <Stack my={2} gap={4}>
            <Box>
                <Typography textAlign='center' variant='h2' mb={0}>Bem-vindo, {user.nome}</Typography>
                <Typography textAlign='center' variant='subtitle1'>Editer seu perfil abaixo.</Typography>
                <Box display='flex' justifyContent='center'>
                    <Tooltip title='Sair' arrow placement='top'>
                        <Fab color='error' aria-label='logout' size='medium' onClick={() => logoutUser()} >
                            <Icon>logout</Icon>
                        </Fab>
                    </Tooltip>
                </Box>
            </Box>

            <Card raised>
                <CardContent>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h5' fontWeight='bold' >Informações Pessoais</Typography>
                        <CardActions>
                            <EditUser user={user} setUser={setUser} />
                        </CardActions>
                    </Box>
                    <Stack gap={2}>
                        <Divider />
                        <Typography variant='h6'><strong>Nome</strong>: {user.nome}</Typography>
                        <Typography variant='h6'><strong>Idade</strong>: {user.idade}</Typography>
                        <Typography variant='h6'><strong>Email</strong>: {user.email}</Typography>
                        <Typography variant='h6'>
                            <strong>Gênero</strong>: {user.genero === 'M' ? 'Masculino' : user.genero === 'F' ? 'Feminino' : 'Outro'}
                        </Typography>
                        <Typography variant='h6'><strong>Telefone</strong>: {user.telefone}</Typography>
                        <Typography variant='h6'><strong>Portador de alguma deficiência</strong>: {user.deficiencia ? 'Sim' : 'Não'}</Typography>
                    </Stack>
                </CardContent>
            </Card>

            <Card raised>
                <CardContent>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h5' fontWeight='bold' >Resumo:</Typography>
                        <CardActions>
                            <EditResumo user={user} setUser={setUser} />
                        </CardActions>
                    </Box>
                    <Box>
                        {user.resumo ? (
                            <Typography variant='body1'>{user.resumo}</Typography>
                        ) : (
                            <Typography variant='body1' color='textSecondary'>
                                <Box component='span' sx={{ cursor: 'pointer' }} onClick={() => document.getElementById('fab-edit-resumo')?.click()}>
                                    Crie um resumo para seu perfil!
                                </Box>
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <Card raised>
                <CardContent >
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h5' fontWeight='bold' >Interesses:</Typography>
                        <CardActions>
                            <AddInteresse interesses={interesses} setInteresses={setInteresses} />
                        </CardActions>
                    </Box>
                    <Stack gap={2}>
                        <Divider />
                        {interesses.length > 0 ? (
                            <Interesses interesses={interesses} setInteresses={setInteresses} />
                        ) : (
                            <Typography variant='body1' color='textSecondary'>
                                <Box component='span' sx={{ cursor: 'pointer' }} onClick={() => document.getElementById('fab-add-interesse')?.click()}>
                                    Adicione um interesse ao seu perfil!
                                </Box>
                            </Typography>
                        )}
                    </Stack>
                </CardContent>
            </Card>

            <Habilidades habilidades={habilidades} setHabilidades={setHabilidades} />

            <FormacoesAcademicas formacoesAcademicas={formacoesAcademicas} setFormacoesAcademicas={setFormacoesAcademicas} />

            <ExperienciasProfissionais experienciasProfissionais={experienciasProfissionais} setExperienciasProfissionais={setExperienciasProfissionais} />

            <Projetos projetos={projetos} setProjetos={setProjetos} />
        </Stack>
    );
};
