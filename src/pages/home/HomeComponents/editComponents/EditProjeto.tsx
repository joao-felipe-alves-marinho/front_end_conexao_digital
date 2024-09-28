import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Icon, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { IProjeto, updateProjeto } from '../../../../services/api/userService/UserService';

type TProjeto = Omit<IProjeto, 'user'>;

interface IProjetoProps {
    projeto: TProjeto;
    projetos: Omit<TProjeto, 'descricao'>[];
    setProjetos: React.Dispatch<React.SetStateAction<Omit<TProjeto, 'descricao'>[]>>;
}

const EditProjetoSchema = yup.object({
    nome: yup.string().required('Esse campo é obrigatório.').min(3, 'O nome do projeto deve ter pelo menos 3 caracteres.').max(255, 'O nome do projeto deve ter no máximo 255 caracteres.'),
    descricao: yup.string(),
    link: yup.string().required('Esse campo é obrigatório.').url('Esse campo deve ser uma URL válida.')
});

export const EditProjeto = (props: IProjetoProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nome: props.projeto.nome,
            descricao: props.projeto.descricao,
            link: props.projeto.link
        },
        resolver: yupResolver(EditProjetoSchema),
        mode: 'onChange'
    });

    const handleEditProjeto = (data: Omit<TProjeto, 'id'>) => {
        updateProjeto(props.projeto.id, data).then((res) => {
            props.setProjetos(props.projetos.map((projeto) => projeto.id === props.projeto.id ? res as Omit<TProjeto, 'descricao'> : projeto));
        });
    }
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(oldOpen => !oldOpen);
    }

    return (
        <>
            <Tooltip title={`Editar Projeto: ${props.projeto.nome}`} arrow placement='top'>
                <Fab color='primary' aria-label='edit' size='small' onClick={toggleOpen} >
                    <Icon>edit</Icon>
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(handleEditProjeto)}
            >
                <DialogTitle align='center' fontWeight='bold'>
                    Atualizar Projeto: {props.projeto.nome}
                </DialogTitle>
                <Divider />
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                    <Button fullWidth onClick={toggleOpen} type='submit'>
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
}
