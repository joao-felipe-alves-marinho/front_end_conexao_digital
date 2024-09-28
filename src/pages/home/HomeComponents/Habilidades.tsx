import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Divider, Fab, FormControl, Icon, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';


import { IHabilidade, createHabilidade, deleteHabilidade } from '../../../services/api/UserService/UserService';
import { EditHabilidade } from './editComponents';

type THabilidade = Omit<IHabilidade, 'user'>;

interface IHabilidadesProps {
    habilidades: THabilidade[];
    setHabilidades: React.Dispatch<React.SetStateAction<THabilidade[]>>;
}

const newHabilidadeSchema = yup.object({
    nome: yup.string().required('Esse campo é obrigatorio.').min(3, 'O nome deve ter pelo menos 3 caracteres.').max(255, 'O nome deve ter no máximo 255 caracteres.'),
    nivel: yup.number().required('Esse campo é obrigatorio.').oneOf([1, 2, 3], 'Escolha um nível válido: 1, 2 ou 3.')
});

export function Habilidades(props: IHabilidadesProps) {
    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            nome: '',
            nivel: 1
        },
        resolver: yupResolver(newHabilidadeSchema),
        mode: 'onChange'
    });

    const [openNewHabilidade, setOpenNewHabilidade] = useState(false);

    const handleOpenNewHabilidade = () => setOpenNewHabilidade(true);
    const handleCloseNewHabilidade = () => {
        setOpenNewHabilidade(false);
        reset();
    };

    const handleAddNewHabilidade = (data: Omit<THabilidade, 'id'>) => {
        createHabilidade(data).then((res) => {
            props.setHabilidades([...props.habilidades, res as THabilidade]);
            handleCloseNewHabilidade();

        });
    };

    const handleDeleteHabilidade = (habilidadeId: number) => {
        deleteHabilidade(habilidadeId).then(() => {
            props.setHabilidades(props.habilidades.filter((habilidade) => habilidade.id !== habilidadeId));
        });
    };


    return (
        <Card raised>
            <CardContent>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h5' fontWeight='bold' >Habilidades:</Typography>
                    <CardActions>
                        <Tooltip title='Adicionar uma nova habilidade' arrow placement='top' >
                            <Fab id='fab-add-habilidade' color='success' aria-label='add-habilidade' size='medium' onClick={handleOpenNewHabilidade} >
                                <Icon>add</Icon>
                            </Fab>
                        </Tooltip>
                    </CardActions>
                </Box>
                <Stack gap={2}>
                    <Divider />
                    {props.habilidades.length > 0 ? (
                        <Table>
                            <TableHead  >
                                <TableRow>
                                    <TableCell><strong>Nome</strong></TableCell>
                                    <TableCell><strong>Nivel</strong></TableCell>
                                    <TableCell align='right' ></TableCell>
                                    <TableCell align='right' ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.habilidades.map((habilidade) => (
                                    <TableRow key={habilidade.id}>
                                        <TableCell>{habilidade.nome}</TableCell>
                                        <TableCell>
                                            {habilidade.nivel === 1 ? 'Iniciante' : habilidade.nivel === 2 ? 'Intermediario' : 'Avançado'}
                                        </TableCell>
                                        <TableCell align='right'>
                                            <EditHabilidade habilidade={habilidade} habilidades={props.habilidades} setHabilidades={props.setHabilidades} />
                                        </TableCell>
                                        <TableCell align='right' >
                                            <Button color='error' onClick={() => handleDeleteHabilidade(habilidade.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table >
                    ) : (
                        <Typography variant='body1' color='textSecondary'>
                            <Box component='span' sx={{ cursor: 'pointer' }} onClick={() => document.getElementById('fab-add-habilidade')?.click()}>
                                Adicione uma habilidade ao seu perfil!
                            </Box>
                        </Typography>
                    )}
                    {openNewHabilidade && (
                        <Box component='form' p={2} onSubmit={handleSubmit(handleAddNewHabilidade)} >
                            <Typography mb={2} variant='subtitle2' fontWeight='bold' >Nova Habilidade:</Typography>
                            <Box display='flex' justifyContent='space-between' alignItems='baseline'>
                                <TextField
                                    label='Nome'
                                    {...register('nome')}
                                    error={!!errors.nome}
                                    helperText={errors.nome?.message}
                                    required
                                />
                                <FormControl>
                                    <InputLabel id='nivel-label'>Nivel</InputLabel>
                                    <Select
                                        label='Nivel'
                                        labelId='genero-label'
                                        id='genero'
                                        {...register('nivel')}
                                        error={!!errors.nivel}
                                        defaultValue={1}
                                    >
                                        <MenuItem value='1'>Iniciante</MenuItem>
                                        <MenuItem value='2'>Intermediario</MenuItem>
                                        <MenuItem value='3'>Avançado</MenuItem>
                                    </Select>
                                </FormControl>

                                <Button disabled={!isDirty || !isValid} type='submit'>
                                    Salvar
                                </Button>
                                <Button color='error' onClick={handleCloseNewHabilidade}>Cancelar</Button>

                            </Box>
                        </Box>
                    )}
                </Stack>
            </CardContent>
        </Card >
    );
}