import { Card, Paper, CardContent, Stack, Box, Typography, Tooltip, Fab, Icon, Link } from '@mui/material';

import { IUser, IProjeto } from '../../../services/api/userService/UserService';

type IProjetos = Pick<IUser, 'projetos'>;


export function Projetos(projetos: IProjetos) {
    return (
        <>
            {projetos.projetos.map((projeto) => (
                <Card key={projeto.id} component={Paper} elevation={4} >
                    <CardContent>
                        <Stack gap={2}>
                            <Stack spacing={1} >
                                <Box display='flex' justifyContent='space-between' alignItems='center'>
                                    <Typography variant='h6'><strong>Nome:</strong> {projeto.nome}</Typography>
                                    <Stack direction='row' spacing={2} >
                                        <Tooltip title='Editar esse Projeto' arrow placement='top' >
                                            <Fab color='primary' aria-label='edit' size='small'>
                                                <Icon>edit</Icon>
                                            </Fab>
                                        </Tooltip>
                                        <Tooltip title='Apagar esse Projeto' arrow placement='top' >
                                            <Fab color='error' aria-label='edit' size='small'>
                                                <Icon>delete</Icon>
                                            </Fab>
                                        </Tooltip>
                                    </Stack>
                                </Box>
                                {/* {projeto.descricao ? (
                                    <Typography variant='body1'>
                                        <strong>Descrição:</strong> {projeto.descricao}
                                    </Typography>
                                ) : null} */}
                                <Typography variant='body1'>
                                    <strong>Link: </strong>
                                    <Link href={projeto.link}>{projeto.link}</Link>
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}