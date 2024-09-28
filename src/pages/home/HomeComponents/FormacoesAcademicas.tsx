import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Divider, Fab, Icon, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as  yup from 'yup';

import { IFormacaoAcademica, createFormacaoAcademica, deleteFormacaoAcademica } from '../../../services/api/userService/UserService';
import { EditFormacao } from './editComponents';

type TFormacao = Omit<IFormacaoAcademica, 'user'>;

interface IFormacoesAcademicasProps {
    formacoesAcademicas: TFormacao[];
    setFormacoesAcademicas: React.Dispatch<React.SetStateAction<TFormacao[]>>;
}

const newFormacaoSchema = yup.object({
    curso: yup.string().required('Esse campo é obrigatorio.').min(3, 'O nome do curso deve ter pelo menos 3 caracteres.').max(255, 'O nome do curso deve ter no máximo 255 caracteres.'),
    instituicao: yup.string().required('Esse campo é obrigatorio.').min(3, 'O nome da instituição deve ter pelo menos 3 caracteres.').max(255, 'O nome da instituição deve ter no máximo 255 caracteres.'),
    ano_inicio: yup.number().typeError('Tem que ser um número').required('Esse campo é obrigatorio.'),
    ano_conclusao: yup.number().typeError('Tem que ser um número').required('Esse campo é obrigatorio.').min(yup.ref('ano_inicio'), 'O ano de conclusão deve ser maior ou igual ao ano de início.'),
    semestre: yup.number().typeError('Tem que ser um número').required('Esse campo é obrigatorio.').min(1, 'O semestre deve ser maior que 0.')
});

export const FormacoesAcademicas = (props: IFormacoesAcademicasProps) => {
    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            curso: '',
            instituicao: '',
            ano_inicio: new Date().getFullYear(),
            ano_conclusao: new Date().getFullYear(),
            semestre: 1
        },
        resolver: yupResolver(newFormacaoSchema),
        mode: 'onChange'
    });

    const [openNewFormacao, setOpenNewFormacao] = useState(false);

    const handleOpenNewFormacao = () => setOpenNewFormacao(true);
    const handleCloseNewFormacao = () => {
        setOpenNewFormacao(false);
        reset();
    }

    const handleAddNewFormacao = (data: Omit<TFormacao, 'id'>) => {
        createFormacaoAcademica(data).then((res) => {
            props.setFormacoesAcademicas([...props.formacoesAcademicas, res as TFormacao]);
            handleCloseNewFormacao();
        });
    }

    const handleDeleteFormacao = (formacaoId: number) => {
        deleteFormacaoAcademica(formacaoId).then(() => {
            props.setFormacoesAcademicas(props.formacoesAcademicas.filter((formacao) => formacao.id !== formacaoId));
        });
    }

    return (
        <Card raised>
            <CardContent>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h5' fontWeight='bold' >Formações Academicas:</Typography>
                    <CardActions>
                        <Tooltip title='Adicionar uma nova formação academica' arrow placement='top' >
                            <Fab id='fab-add-formacao' color='success' aria-label='add-experiencia' size='medium' onClick={handleOpenNewFormacao} >
                                <Icon>add</Icon>
                            </Fab>
                        </Tooltip>
                    </CardActions>
                </Box>
                <Stack gap={2}>
                    <Divider />
                    {props.formacoesAcademicas.length > 0 ? (
                        props.formacoesAcademicas.map((formacao: TFormacao) => (
                            <Card key={formacao.id} component={Paper} elevation={4} >
                                <CardContent>
                                    <Stack gap={2}>
                                        <Stack spacing={1} >
                                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                                <Typography variant='h6'><strong>Curso:</strong> {formacao.curso}</Typography>
                                                <Stack direction='row' spacing={2} >
                                                    <EditFormacao formacao={formacao} formacoesAcademicas={props.formacoesAcademicas} setFormacoesAcademicas={props.setFormacoesAcademicas} />
                                                    <Tooltip title='Apagar essa Formação Academica' arrow placement='top' >
                                                        <Fab color='error' aria-label='delete' size='small' onClick={() => handleDeleteFormacao(formacao.id)}>
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
                        ))
                    ) : (
                        <Typography variant='body1' color='textSecondary'>
                            <Box component='span' sx={{ cursor: 'pointer' }} onClick={() => document.getElementById('fab-add-formacao')?.click()}>
                                Adicione uma formação acadêmica ao seu perfil!
                            </Box>
                        </Typography>
                    )}
                    {openNewFormacao && (
                        <Card component={Paper} elevation={4} >
                            <CardContent>
                                <Stack gap={2}>
                                    <Stack spacing={1} >
                                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                                            <Typography mb={2} variant='h6' fontWeight='bold' >Nova Formação Academica:</Typography>
                                            <Stack direction='row' spacing={6} >
                                                <Tooltip title='Salvar Nova Formação Academica' arrow placement='top' >
                                                    <Button size='large' variant='contained' color='primary' onClick={handleSubmit(handleAddNewFormacao)} disabled={!isDirty || !isValid} >Salvar</Button>
                                                </Tooltip>
                                                <Tooltip title='Remover Nova Formação Academica' arrow placement='top' >
                                                    <Button size='large' variant='contained' color='error' onClick={handleCloseNewFormacao} >Cancelar</Button>
                                                </Tooltip>
                                            </Stack>
                                        </Box>
                                        <Divider />
                                        <Stack gap={2}>
                                            <Box>
                                                <Typography variant='subtitle2'><strong>Curso:</strong></Typography>
                                                <TextField
                                                    placeholder='Nome do Curso'
                                                    variant='outlined'
                                                    error={!!errors.curso}
                                                    helperText={errors.curso?.message}
                                                    {...register('curso')}
                                                />
                                            </Box>
                                            <Box>
                                                <Typography variant='subtitle2'><strong>Instituição:</strong></Typography>
                                                <TextField
                                                    placeholder='Nome da Instituição'
                                                    variant='outlined'
                                                    error={!!errors.instituicao}
                                                    helperText={errors.instituicao?.message}
                                                    {...register('instituicao')}
                                                />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                    <Stack direction='row' spacing={4} >
                                        <Box>
                                            <Typography variant='subtitle2'><strong>Ano de Início:</strong></Typography>
                                            <TextField
                                                variant='outlined'
                                                error={!!errors.ano_inicio}
                                                helperText={errors.ano_inicio?.message}
                                                {...register('ano_inicio')}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography variant='body1'><strong>Ano de Conclusão:</strong></Typography>
                                            <TextField
                                                variant='outlined'
                                                error={!!errors.ano_conclusao}
                                                helperText={errors.ano_conclusao?.message}
                                                {...register('ano_conclusao')}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography variant='body1'><strong>Semestre:</strong></Typography>
                                            <TextField
                                                variant='outlined'
                                                error={!!errors.semestre}
                                                helperText={errors.semestre?.message}
                                                {...register('semestre')}
                                            />
                                        </Box>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}