import { useOutletContext } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Divider, Fab, Icon, Stack, TextField, Tooltip, Typography } from '@mui/material';

import { IUserContext } from '../../layouts/BaseAuth';
import { EditResumo, EditUser, ExperienciasProfissionais, FormacoesAcademicas, Habilidades, Interesses, Projetos,  } from './HomeComponents';


export function Home() {
    const { user, setUser } = useOutletContext<IUserContext>();
    if (!user) {
        return <p>User not found or not logged in.</p>;
    }

    return (
        <Stack my={2} gap={4}>
            <Box>
                <Typography textAlign='center' variant='h2' mb={0}>Bem-vindo, {user.nome}</Typography>
                <Typography textAlign='center' variant='subtitle1'>Editer seu perfil abaixo.</Typography>
            </Box>

            <Card raised>
                <CardContent>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h5' fontWeight='bold' >Informações Pessoais</Typography>
                        <CardActions>
                            <EditUser user={user} setUser={setUser}/>
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
                            <EditResumo user={user} setUser={setUser}/>
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
                            <Tooltip title='Adicionar um novo interesse' arrow placement='top' >
                                <Fab color='success' aria-label='add-interesse' size='medium'>
                                    <Icon>add</Icon>
                                </Fab>
                            </Tooltip>
                        </CardActions>
                    </Box>
                    <Stack gap={2}>
                        <Divider />
                        {user.interesses ? (
                            <Interesses interesses={user.interesses} />
                        ) : (
                            <Typography variant='body1' color='textSecondary'>
                                <Box component='span' sx={{ cursor: 'pointer' }} onClick={() => {/* Add the logic to trigger the adicionar interesse action */ }}>
                                    Adicione um interesse ao seu perfil!
                                </Box>
                            </Typography>
                        )}
                    </Stack>
                </CardContent>
            </Card>

            <Card raised>
                <CardContent>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h5' fontWeight='bold' >Habilidades:</Typography>
                        <CardActions>
                            <Tooltip title='Adicionar uma nova habilidade' arrow placement='top' >
                                <Fab color='success' aria-label='add-habilidade' size='medium'>
                                    <Icon>add</Icon>
                                </Fab>
                            </Tooltip>
                        </CardActions>
                    </Box>
                    <Stack gap={2}>
                        <Divider />
                        {user.habilidades ? (
                            <Habilidades habilidades={user.habilidades} />
                        ) : (
                            <Typography variant='body1' color='textSecondary'>
                                <Box component='span' sx={{ cursor: 'pointer' }} onClick={() => {/* Add the logic to trigger the adicionar habilidade action */ }}>
                                    Adicione uma habilidade ao seu perfil!
                                </Box>
                            </Typography>
                        )}
                    </Stack>
                </CardContent>
            </Card>

            <Card raised>
                <CardContent>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h5' fontWeight='bold' >Formações Academicas:</Typography>
                        <CardActions>
                            <Tooltip title='Adicionar uma nova formação academica' arrow placement='top' >
                                <Fab color='success' aria-label='add-experiencia' size='medium'>
                                    <Icon>add</Icon>
                                </Fab>
                            </Tooltip>
                        </CardActions>
                    </Box>
                    <Stack gap={2}>
                        <Divider />
                        {user.formacoes_academicas ? (
                            <FormacoesAcademicas formacoes_academicas={user.formacoes_academicas} />
                        ) : (
                            <Typography variant='body1' color='textSecondary'>
                                <Box component='span' sx={{ cursor: 'pointer' }} onClick={() => {/* Add the logic to trigger the adicionar formacao academica action */ }}>
                                    Adicione uma formação acadêmica ao seu perfil!
                                </Box>
                            </Typography>
                        )}
                    </Stack>
                </CardContent>
            </Card>

            <Card raised>
                <CardContent>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h5' fontWeight='bold' >Experiências Profissionais:</Typography>
                        <CardActions>
                            <Tooltip title='Adicionar uma nova experiência profissional' arrow placement='top' >
                                <Fab color='success' aria-label='add-experiencia' size='medium'>
                                    <Icon>add</Icon>
                                </Fab>
                            </Tooltip>
                        </CardActions>
                    </Box>
                    <Stack gap={2}>
                        <Divider />
                        {user.experiencias_profissionais ? (
                            <ExperienciasProfissionais experiencias_profissionais={user.experiencias_profissionais} />
                        ) : (
                            <Typography variant='body1' color='textSecondary'>
                                <Box component='span' sx={{ cursor: 'pointer' }} onClick={() => {/* Add the logic to trigger the adicionar experiencia profissional action */ }}>
                                    Adicione uma experiência profissional ao seu perfil!
                                </Box>
                            </Typography>
                        )}
                    </Stack>
                </CardContent>
            </Card>

            <Card raised>
                <CardContent>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h5' fontWeight='bold' >Projetos:</Typography>
                        <CardActions>
                            <Tooltip title='Adicionar um novo projeto' arrow placement='top' >
                                <Fab color='success' aria-label='add-projeto' size='medium'>
                                    <Icon>add</Icon>
                                </Fab>
                            </Tooltip>
                        </CardActions>
                    </Box>
                    <Stack gap={2}>
                        <Divider />
                        {user.projetos ? (
                            <Projetos projetos={user.projetos} />
                        ) : (
                            <Typography variant='body1' color='textSecondary'>
                                <Box component='span' sx={{ cursor: 'pointer' }} onClick={() => {/* Add the logic to trigger the adicionar projeto action */ }}>
                                    Adicione um projeto ao seu perfil!
                                </Box>
                            </Typography>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
};
