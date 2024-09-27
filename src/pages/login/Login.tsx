import { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Divider, Icon, IconButton, Link, Stack, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';


import { loginUser } from '../../services/api/authService/AuthService';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
    username: string;
    password: string;
}

const loginSchema = yup.object({
    username: yup.string().lowercase().required('Esse campo é obrigatorio.').email('E-mail invalido.').min(5, 'O e-mail deve ter pelo menos 5 caracteres').max(255, 'O e-mail deve ter no máximo 255 caracteres.'),
    password: yup.string().required('Esse campo é obrigatorio.').max(255, 'A senha deve ter no máximo 255 caracteres.'),
});


export function Login() {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
        mode: 'onChange'
    });

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    function onSubmit(data: LoginForm) {
        setIsLoading(true);
        setSuccess(false);
        setAlert(false);
        loginUser(data)
            .then(() => {
                setSuccess(true);
                navigate('/');
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
        <Stack mt={8} gap={2}>
            <Typography textAlign='center' variant='h1'>Login</Typography>
            <Divider />
            <Box
                display='flex'
                flexDirection='column'
                gap={2}
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                {alert && <Alert severity='error' variant='filled'>Credenciais Inválidas</Alert>}
                {success && <Alert severity='success' variant='filled'>Login efetuado com sucesso</Alert>}
                <TextField
                    label='Email'
                    placeholder="joao@gmail.com"
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    disabled={isLoading}
                />
                <TextField
                    label='Senha'
                    placeholder="*********"
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
                {/* <Link href='/recover-password' align="right">Esqueceu a senha?</Link> */}
                <Button
                    fullWidth
                    type='submit'
                    disabled={!isDirty || !isValid || isLoading}
                >
                    {isLoading ? <CircularProgress /> : 'Entrar'}
                </Button>
            </Box>
            <Divider />
            <Typography align="center">Ainda não possui uma conta? <Link href='/register'>Cadastre-se</Link></Typography>
        </Stack>
    );
} 