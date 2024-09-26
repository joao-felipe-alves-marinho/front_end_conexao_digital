import { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControl, FormControlLabel, Icon, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Tooltip } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { IUserContext } from '../../../../layouts';
import { IUser, TUpdateUserPayload, updateUser } from '../../../../services/api/userService/UserService';

const EditUserSchema = yup.object({
    email: yup.string().lowercase().required('Esse campo é obrigatorio.').email('E-mail invalido.').min(5, 'O e-mail deve ter pelo menos 5 caracteres').max(255, 'O e-mail deve ter no máximo 255 caracteres.'),
    nome: yup.string().required('Esse campo é obrigatorio.').min(5, 'O nome deve ter pelo menos 5 caracteres.').max(255, 'O nome deve ter no máximo 255 caracteres.'),
    idade: yup.number().typeError('Idade deve ser um número').required('Esse campo é obrigatorio.'),
    genero: yup.string().oneOf(['M', 'F', 'O'], 'Gênero inválido.').required('Esse campo é obrigatorio.'),
    telefone: yup.string().required('Esse campo é obrigatorio.').min(10, 'O telefone deve ter pelo menos 10 caracteres.').max(11, 'O telefone deve ter no máximo 11 caracteres.'),
    deficiencia: yup.boolean(),
});

export function EditUser(props: IUserContext) {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            email: props.user?.email ?? '',
            nome: props.user?.nome ?? '',
            idade: props.user?.idade ?? 0,
            genero: props.user?.genero ?? 'M',
            telefone: props.user?.telefone ?? '',
            deficiencia: props.user?.deficiencia ?? false,
        },
        resolver: yupResolver(EditUserSchema),
        mode: 'onChange'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [alert, setAlert] = useState(false);

    function onSubmit(data: TUpdateUserPayload) {
        setIsLoading(true);
        setAlert(false);
        updateUser({
            email: data.email,
            nome: data.nome,
            idade: data.idade,
            genero: data.genero,
            telefone: data.telefone,
            deficiencia: data.deficiencia,
            resumo: props.user?.resumo ?? '',
            avatar: props.user?.avatar ?? '',
        }).then((res) => {
            setSuccess(true);
            const updatedUser = res as IUser;
            props.setUser(updatedUser);
        }).catch(() => {
            setAlert(true);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }

    return (
        <>
            <Tooltip title='Editar informações pessoais' arrow placement='top' >
                <Fab color='primary' aria-label='edit' size='medium' onClick={toggleOpen} >
                    <Icon>edit</Icon>
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle align='center' fontWeight='bold' >Atualizar Perfil</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2} >
                        <TextField
                            fullWidth
                            label='E-mail'
                            variant='outlined'
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            fullWidth
                            label='Nome'
                            variant='outlined'
                            {...register('nome')}
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                        />

                        <TextField
                            fullWidth
                            label='Idade'
                            variant='outlined'
                            {...register('idade')}
                            error={!!errors.idade}
                            helperText={errors.idade?.message}
                        />

                        <FormControl fullWidth>
                            <InputLabel id='genero-label'>Gênero</InputLabel>
                            <Select
                                labelId='genero-label'
                                id='genero'
                                {...register('genero')}
                                error={!!errors.genero}
                            >
                                <MenuItem value='M'>Masculino</MenuItem>
                                <MenuItem value='F'>Feminino</MenuItem>
                                <MenuItem value='O'>Outro</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label='Telefone'
                            variant='outlined'
                            {...register('telefone')}
                            error={!!errors.telefone}
                            helperText={errors.telefone?.message}
                        />

                        <FormControlLabel label='Possui alguma deficiencia?' control={
                            <Checkbox inputProps={{
                                'aria-label': 'Deficiencia',
                            }}
                                {...register('deficiencia')}
                            />
                        } />    
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button fullWidth onClick={toggleOpen} type='submit'>
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
