import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Divider, Fab, Icon, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { IExperienciaProfissional, createExperienciaProfissional, deleteExperienciaProfissional } from '../../../services/api/UserService/UserService';
import { EditExperiencia } from './editComponents';

type TExperiencia = Omit<IExperienciaProfissional, 'user'>;

interface IExperienciasProfissionaisProps {
    experienciasProfissionais: TExperiencia[];
    setExperienciasProfissionais: React.Dispatch<React.SetStateAction<TExperiencia[]>>;
}

const newExperienciaSchema = yup.object({
    cargo: yup.string().required('Esse campo é obrigatorio.').min(3, 'O nome do cargo deve ter pelo menos 3 caracteres.').max(255, 'O nome do cargo deve ter no máximo 255 caracteres.'),
    empresa: yup.string().required('Esse campo é obrigatorio.').min(3, 'O nome da empresa deve ter pelo menos 3 caracteres.').max(255, 'O nome da empresa deve ter no máximo 255 caracteres.'),
    ano_inicio: yup.number().typeError('Tem que ser um número').required('Esse campo é obrigatorio.'),
    ano_fim: yup.number().typeError('Tem que ser um número'),
    descricao: yup.string().max(255, 'A descrição deve ter no máximo 255 caracteres.')
});

export const ExperienciasProfissionais = (props: IExperienciasProfissionaisProps) => {
    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            cargo: '',
            empresa: '',
            ano_inicio: 0,
            ano_fim: 0,
            descricao: ''
        },
        resolver: yupResolver(newExperienciaSchema),
        mode: 'onChange'
    });

    const [openNewExperiencia, setOpenNewExperiencia] = useState(false);

    const handleOpenNewExperiencia = () => setOpenNewExperiencia(true);
    const handleCloseNewExperiencia = () => {
        setOpenNewExperiencia(false);
        reset();
    };

    const handleAddNewExperiencia = (data: Omit<TExperiencia, 'id'> & { ano_fim?: number }) => {
        createExperienciaProfissional(data).then((res) => {
            props.setExperienciasProfissionais([...props.experienciasProfissionais, res as TExperiencia]);
            handleCloseNewExperiencia();
        });
    };

    const handleDeleteExperiencia = (experienciaId: number) => {
        deleteExperienciaProfissional(experienciaId).then(() => {
            props.setExperienciasProfissionais(props.experienciasProfissionais.filter((experiencia) => experiencia.id !== experienciaId));
        });
    };

    return (
        <Card raised>
            <CardContent>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h5' fontWeight='bold' >Experiências Profissionais:</Typography>
                    <CardActions>
                        <Tooltip title='Adicionar uma nova experiência profissional' arrow placement='top' >
                            <Fab id='fab-add-experiencia' color='success' aria-label='add-experiencia' size='medium' onClick={handleOpenNewExperiencia}>
                                <Icon>add</Icon>
                            </Fab>
                        </Tooltip>
                    </CardActions>
                </Box>
                <Stack gap={2}>
                    <Divider />
                    {props.experienciasProfissionais.length > 0 ? (
                        props.experienciasProfissionais.map((experiencia: TExperiencia) => (
                            <Card key={experiencia.id} component={Paper} elevation={4} >
                                <CardContent>
                                    <Stack gap={2}>
                                        <Stack spacing={1} >
                                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                                <Typography variant='h6'><strong>Cargo:</strong> {experiencia.cargo}</Typography>
                                                <Stack direction='row' spacing={2} >
                                                    <EditExperiencia experiencia={experiencia} experienciasProfissionais={props.experienciasProfissionais} setExperienciasProfissionais={props.setExperienciasProfissionais} />
                                                    <Tooltip title='Apagar essa Experiencia Profissional' arrow placement='top' >
                                                        <Fab color='error' aria-label='edit' size='small' onClick={() => handleDeleteExperiencia(experiencia.id)}>
                                                            <Icon>delete</Icon>
                                                        </Fab>
                                                    </Tooltip>
                                                </Stack>
                                            </Box>
                                            <Typography variant='h6'><strong>Empresa:</strong> {experiencia.empresa}</Typography>
                                        </Stack>
                                        <Stack direction='row' spacing={4} >
                                            <Typography variant='body1'><strong>Ano de Início:</strong> {experiencia.ano_inicio}</Typography>
                                            {experiencia.ano_fim !== undefined && experiencia.ano_fim > 0 && (
                                                <Typography variant='body1'><strong>Ano de Fim:</strong> {experiencia.ano_fim}</Typography>
                                            )}
                                        </Stack>
                                        {experiencia.descricao && (
                                            <Typography variant='body2'><strong>Descrição:</strong> {experiencia.descricao}</Typography>
                                        )}
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))

                    ) : (
                        <Typography variant='body1' color='textSecondary'>
                            <Box component='span' sx={{ cursor: 'pointer' }} onClick={() => document.getElementById('fab-add-experiencia')?.click()}>
                                Adicione uma experiência profissional ao seu perfil!
                            </Box>
                        </Typography>
                    )}
                    {openNewExperiencia && (
                        <Card component={Paper} elevation={4} >
                            <CardContent>
                                <Stack gap={2}>
                                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                                        <Typography variant='h6' fontWeight='bold' >Nova Experiência Profissional:</Typography>
                                        <Stack direction='row' spacing={6} >
                                            <Tooltip title='Salvar Nova Experiência Profissional' arrow placement='top' >
                                                <Button size='large' variant='contained' color='primary' onClick={handleSubmit(handleAddNewExperiencia)} disabled={!isDirty || !isValid} >Salvar</Button>
                                            </Tooltip>
                                            <Tooltip title='Remover Nova Formação Academica' arrow placement='top' >
                                                <Button size='large' variant='contained' color='error' onClick={handleCloseNewExperiencia} >Cancelar</Button>
                                            </Tooltip>
                                        </Stack>
                                    </Box>
                                    <Divider />
                                    <Stack gap={2}>
                                        <Box>
                                            <Typography variant='subtitle2'><strong>Cargo:</strong></Typography>
                                            <TextField
                                                placeholder='Nome do Cargo'
                                                variant='outlined'
                                                error={!!errors.cargo}
                                                helperText={errors.cargo?.message}
                                                {...register('cargo')}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography variant='subtitle2'><strong>Empresa:</strong></Typography>
                                            <TextField
                                                placeholder='Nome da Empresa'
                                                variant='outlined'
                                                error={!!errors.empresa}
                                                helperText={errors.empresa?.message}
                                                {...register('empresa')}
                                            />
                                        </Box>
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
                                            <Typography variant='subtitle2'><strong>Ano de Fim:</strong></Typography>
                                            <TextField
                                                variant='outlined'
                                                error={!!errors.ano_fim}
                                                helperText={errors.ano_fim?.message || 'Coloque 0 se ainda trabalha nessa empresa.'}
                                                {...register('ano_fim')}
                                            />
                                        </Box>
                                    </Stack>
                                    <Box>
                                        <Typography variant='subtitle2'><strong>Descrição:</strong></Typography>
                                        <TextField
                                            placeholder='Descrição da Experiência Profissional'
                                            variant='outlined'
                                            error={!!errors.descricao}
                                            multiline
                                            fullWidth
                                            helperText={errors.descricao?.message}
                                            {...register('descricao')}
                                        />
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};