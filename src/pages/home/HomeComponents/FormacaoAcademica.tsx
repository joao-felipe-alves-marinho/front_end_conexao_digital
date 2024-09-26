import { Box, Card, CardContent, Fab, Icon, Paper, Stack, Tooltip, Typography } from '@mui/material';

import { IUser, IFormacaoAcademica } from '../../../services/api/userService/UserService';

type IFormacoesAcademicas = Pick<IUser, 'formacoes_academicas'>;
type IFormacao = Omit<IFormacaoAcademica, 'user'>;

export function FormacoesAcademicas(formacoesAcademicas: IFormacoesAcademicas) {
    return (
        <>
            {formacoesAcademicas.formacoes_academicas.map((formacao: IFormacao) => (
                <Card key={formacao.id} component={Paper} elevation={4} >
                    <CardContent>
                        <Stack gap={2}>
                            <Stack spacing={1} >
                                <Box display='flex' justifyContent='space-between' alignItems='center'>
                                    <Typography variant='h6'><strong>Curso:</strong> {formacao.curso}</Typography>
                                    <Stack direction='row' spacing={2} >
                                        <Tooltip title='Editar essa Formação Academica' arrow placement='top' >
                                            <Fab color='primary' aria-label='edit' size='small'>
                                                <Icon>edit</Icon>
                                            </Fab>
                                        </Tooltip>
                                        <Tooltip title='Apagar essa Formação Academica' arrow placement='top' >
                                            <Fab color='error' aria-label='edit' size='small'>
                                                <Icon>delete</Icon>
                                            </Fab>
                                        </Tooltip>
                                    </Stack>
                                </Box>
                                <Typography variant='h6'><strong>Instituição:</strong> {formacao.instituicao}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={4} >
                                <Typography variant='body1'><strong>Ano de Início:</strong> {formacao.ano_inicio}</Typography>
                                <Typography variant='body1'><strong>Ano de Conclusão:</strong> {formacao.ano_conclusao}</Typography>
                                <Typography variant='body1'><strong>Semestre:</strong> {formacao.semestre}</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}