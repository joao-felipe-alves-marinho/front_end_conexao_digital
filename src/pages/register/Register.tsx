import { useState } from 'react';
import { Typography, Divider, Box, Alert, TextField, Checkbox, IconButton, Icon, Button, CircularProgress, Link, Stack, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { createUser, ICreateUserPayload } from '../../services/api/userService/UserService';


const RegisterSchema = yup.object({
    email: yup.string().lowercase().required('Esse campo é obrigatorio.').email('E-mail invalido.').min(5, 'O e-mail deve ter pelo menos 5 caracteres').max(255, 'O e-mail deve ter no máximo 255 caracteres.'),
    nome: yup.string().required('Esse campo é obrigatorio.').min(5, 'O nome deve ter pelo menos 5 caracteres.').max(255, 'O nome deve ter no máximo 255 caracteres.'),
    password: yup.string().required('Esse campo é obrigatorio.').min(5, 'A senha deve ter pelo menos 5 caracteres.').max(255, 'A senha deve ter no máximo 255 caracteres.'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'As senhas não coincidem.'),
    idade: yup.number().required('Esse campo é obrigatorio.'),
    genero: yup.string().oneOf(['M', 'F', 'O'], 'Gênero inválido.').required('Esse campo é obrigatorio.'),
    telefone: yup.string().required('Esse campo é obrigatorio.').min(10, 'O telefone deve ter pelo menos 10 caracteres.').max(11, 'O telefone deve ter no máximo 11 caracteres.'),
    deficiencia: yup.boolean(),
    resumo: yup.string(),
    avatar: yup.string(),
});

export function Register() {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            email: '',
            nome: '',
            password: '',
            passwordConfirmation: '',
            idade: 0,
            genero: 'M',
            telefone: '',
            deficiencia: false,
            resumo: '',
            avatar: '',
        },
        resolver: yupResolver(RegisterSchema),
        mode: 'onChange'
    });

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);

    function onSubmit(data: ICreateUserPayload) {
        setIsLoading(true);
        setAlert(false);
        createUser({
            email: data.email,
            nome: data.nome,
            password: data.password,
            idade: data.idade,
            genero: data.genero,
            telefone: data.telefone,
            deficiencia: data.deficiencia,
            resumo: data.resumo,
            avatar: data.avatar,
        }
        )
            .then(() => {
                navigate('/login');
            })
            .catch(() => {
                setAlert(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const [showPassword, setShowPassword] = useState(false);
    function toggleShowPassword() { setShowPassword((show) => !show); }

    return (
        <Stack mt={1} gap={2}>
            <Typography textAlign='center' variant="h1">Cadastre-se</Typography>
            <Divider />
            <Box
                display='flex'
                flexDirection='column'
                gap={2}
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                {alert && <Alert severity='error' variant='filled'>E-mail já está registrado</Alert>}
                <TextField
                    label='E-mail'
                    placeholder='juana@gmail.com'
                    type='email'
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={isLoading}
                />
                <TextField
                    label='Nome'
                    placeholder='Luana'
                    {...register('nome')}
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                    disabled={isLoading}
                />
                <TextField
                    label='Senha'
                    placeholder='*********'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    disabled={isLoading}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label='show-password'
                                size='large'
                                onClick={toggleShowPassword}
                            >
                                <Icon>{showPassword ? 'visibility_off' : 'visibility'}</Icon>
                            </IconButton>
                        ),
                    }}
                />
                <TextField
                    label='Confirmar a Senha'
                    placeholder='*********'
                    type={showPassword ? 'text' : 'password'}
                    {...register('passwordConfirmation')}
                    error={!!errors.passwordConfirmation}
                    helperText={errors.passwordConfirmation?.message}
                    disabled={isLoading}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label='show-password'
                                size='large'
                                onClick={toggleShowPassword}
                            >
                                <Icon>{showPassword ? 'visibility_off' : 'visibility'}</Icon>
                            </IconButton>
                        ),
                    }}
                />
                <TextField
                    label='Idade'
                    type='number'
                    {...register('idade')}
                    error={!!errors.idade}
                    helperText={errors.idade?.message}
                    disabled={isLoading}
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
                    label='Telefone'
                    placeholder='11999999999'
                    {...register('telefone')}
                    error={!!errors.telefone}
                    helperText={errors.telefone?.message || 'Digite apenas numeros'}
                    disabled={isLoading}
                />
                <FormControlLabel label='Possui alguma deficiencia?' control={
                    <Checkbox inputProps={{
                        'aria-label': 'Deficiencia',
                    }}
                        {...register('deficiencia')}
                    />
                } />
                <Button
                    fullWidth
                    type='submit'
                    disabled={!isDirty || !isValid || isLoading}
                >
                    {isLoading ? <CircularProgress /> : 'Cadastrar'}
                </Button>
            </Box>
            <Divider />
            <Typography align="center">Já possui uma conta? <Link href='/login'>Login</Link></Typography>
        </Stack>
    );
}