import { useState } from 'react';
import { Card, Paper, CardContent, Stack, Box, Typography, Tooltip, Fab, Icon, Link, CardActions, Divider, TextField, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { IProjeto, createProjeto, deleteProjeto } from '../../../services/api/UserService/UserService';
import { EditProjeto } from './editComponents';

type TProjeto = Omit<IProjeto, 'user'>;

interface IProjetoProps {
    projetos: Omit<TProjeto, 'descricao'>[];
    setProjetos: React.Dispatch<React.SetStateAction<Omit<TProjeto, 'descricao'>[]>>;
}

const newProjetoSchema = yup.object({
    nome: yup.string().required('Esse campo é obrigatório.').min(3, 'O nome do projeto deve ter pelo menos 3 caracteres.').max(255, 'O nome do projeto deve ter no máximo 255 caracteres.'),
    descricao: yup.string(),
    link: yup.string().required('Esse campo é obrigatório.').url('Esse campo deve ser uma URL válida.')
});

export const Projetos = (props: IProjetoProps) => {
    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            nome: '',
            descricao: '',
            link: ''
        },
        resolver: yupResolver(newProjetoSchema),
        mode: 'onChange'
    });

    const [openNewProjeto, setOpenNewProjeto] = useState(false);

    const handleOpenNewProjeto = () => setOpenNewProjeto(true);
    const handleCloseNewProjeto = () => {
        setOpenNewProjeto(false);
        reset();
    };

    const handleAddNewProjeto = (data: Omit<TProjeto, 'id'>) => {
        createProjeto(data).then((res) => {
            props.setProjetos([...props.projetos, res as Omit<TProjeto, 'descricao'>]);
            handleCloseNewProjeto();
        });
    };

    const handleDeleteProjeto = (projetoId: number) => {
        deleteProjeto(projetoId).then(() => {
            props.setProjetos(props.projetos.filter((projeto) => projeto.id !== projetoId));
        });
    };

    return (
        <Card raised>
            <CardContent>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h5' fontWeight='bold' >Projetos:</Typography>
                    <CardActions>
                        <Tooltip title='Adicionar um novo projeto' arrow placement='top' >
                            <Fab id='fab-add-projeto' color='success' aria-label='add-projeto' size='medium' onClick={handleOpenNewProjeto} >
                                <Icon>add</Icon>
                            </Fab>
                        </Tooltip>
                    </CardActions>
                </Box>
                <Stack gap={2}>
                    <Divider />
                    {props.projetos.length > 0 ? (
                        props.projetos.map((projeto) => (
                            <Card key={projeto.id} component={Paper} elevation={4} >
                                <CardContent>
                                    <Stack gap={2}>
                                        <Stack spacing={1} >
                                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                                <Typography variant='h6'><strong>Nome:</strong> {projeto.nome}</Typography>
                                                <Stack direction='row' spacing={2} >
                                                    <EditProjeto projeto={projeto} projetos={props.projetos} setProjetos={props.setProjetos} />
                                                    <Tooltip title='Apagar esse Projeto' arrow placement='top' >
                                                        <Fab color='error' aria-label='delete' size='small' onClick={() => handleDeleteProjeto(projeto.id)} >
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
                        ))

                    ) : (
                        <Typography variant='body1' color='textSecondary'>
                            <Box component='span' sx={{ cursor: 'pointer' }} onClick={() => document.getElementById('fab-add-projeto')?.click()}>
                                Adicione um projeto ao seu perfil!
                            </Box>
                        </Typography>
                    )}
                    {openNewProjeto && (
                        <Card component={Paper} elevation={4} >
                            <CardContent>
                                <Stack gap={2}>
                                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                                        <Typography variant='h6' fontWeight='bold' >Novo Projeto:</Typography>
                                        <Stack direction='row' spacing={6} >
                                            <Tooltip title='Salvar Nova Experiência Profissional' arrow placement='top' >
                                                <Button size='large' variant='contained' color='primary' onClick={handleSubmit(handleAddNewProjeto)} disabled={!isDirty || !isValid} >Salvar</Button>
                                            </Tooltip>
                                            <Tooltip title='Remover Nova Formação Academica' arrow placement='top' >
                                                <Button size='large' variant='contained' color='error' onClick={handleCloseNewProjeto} >Cancelar</Button>
                                            </Tooltip>
                                        </Stack>
                                    </Box>
                                    <Divider />
                                    <Stack gap={2}>
                                        <Stack direction='row' gap={8}>
                                            <Box>
                                                <Typography variant='subtitle2'><strong>Projeto:</strong></Typography>
                                                <TextField
                                                    placeholder='Nome do Projeto'
                                                    variant='outlined'
                                                    {...register('nome')}
                                                    error={!!errors.nome}
                                                    helperText={errors.nome?.message}
                                                />
                                            </Box>
                                            <Box>
                                                <Typography variant='subtitle2'><strong>Link:</strong></Typography>
                                                <TextField
                                                    placeholder='Link do Projeto'
                                                    variant='outlined'
                                                    {...register('link')}
                                                    error={!!errors.link}
                                                    helperText={errors.link?.message}
                                                />
                                            </Box>
                                        </Stack>
                                        <Box>
                                            <Typography variant='subtitle2'><strong>Descrição:</strong></Typography>
                                            <TextField
                                                placeholder='Descrição do Projeto'
                                                variant='outlined'
                                                {...register('descricao')}
                                                error={!!errors.descricao}
                                                helperText={errors.descricao?.message}
                                                multiline
                                                fullWidth
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
};