import { Box, Card, CardContent, Fab, Icon, Paper, Stack, Tooltip, Typography } from '@mui/material';

import { IUser, IExperienciaProfissional } from '../../../services/api/userService/UserService';

type IExperienciasProfissionais = Pick<IUser, 'experiencias_profissionais'>;
type IExperiencia = Omit<IExperienciaProfissional, 'user'>;

export function ExperienciasProfissionais(experienciasProfissionais: IExperienciasProfissionais) {
    return (
        <>
            {experienciasProfissionais.experiencias_profissionais.map((experiencia: IExperiencia) => (
                <Card key={experiencia.id} component={Paper} elevation={4} >
                    <CardContent>
                        <Stack gap={2}>
                            <Stack spacing={1} >
                                <Box display='flex' justifyContent='space-between' alignItems='center'>
                                    <Typography variant='h6'><strong>Cargo:</strong> {experiencia.cargo}</Typography>
                                    <Stack direction='row' spacing={2} >
                                        <Tooltip title='Editar essa Experiencia Profissional' arrow placement='top' >
                                            <Fab color='primary' aria-label='edit' size='small'>
                                                <Icon>edit</Icon>
                                            </Fab>
                                        </Tooltip>
                                        <Tooltip title='Apagar essa Experiencia Profissional' arrow placement='top' >
                                            <Fab color='error' aria-label='edit' size='small'>
                                                <Icon>delete</Icon>
                                            </Fab>
                                        </Tooltip>
                                    </Stack>
                                </Box>
                                <Typography variant='h6'><strong>Empresa:</strong> {experiencia.empresa}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={4} >
                                <Typography variant='body1'><strong>Ano de Início:</strong> {experiencia.ano_inicio}</Typography>
                                {experiencia.ano_fim > 0 && (
                                    <Typography variant='body1'><strong>Ano de Fim:</strong> {experiencia.ano_fim}</Typography>
                                )}
                            </Stack>
                            {experiencia.descricao && (
                                <Typography variant='body2'><strong>Descrição:</strong> {experiencia.descricao}</Typography>
                            )}
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}