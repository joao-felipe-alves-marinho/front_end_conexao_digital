import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControl, FormControlLabel, Icon, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { IFormacaoAcademica, updateFormacaoAcademica } from '../../../../services/api/userService/UserService';

type TFormacao = Omit<IFormacaoAcademica, 'user'>;

interface IFormacoesAcademicasProps {
    formacao: TFormacao;
    formacoesAcademicas: TFormacao[];
    setFormacoesAcademicas: React.Dispatch<React.SetStateAction<TFormacao[]>>;
}

const EditFormacaoSchema = yup.object({
    curso: yup.string().required('Esse campo é obrigatorio.').min(3, 'O nome do curso deve ter pelo menos 3 caracteres.').max(255, 'O nome do curso deve ter no máximo 255 caracteres.'),
    instituicao: yup.string().required('Esse campo é obrigatorio.').min(3, 'O nome da instituição deve ter pelo menos 3 caracteres.').max(255, 'O nome da instituição deve ter no máximo 255 caracteres.'),
    ano_inicio: yup.number().typeError('Tem que ser um número').required('Esse campo é obrigatorio.'),
    ano_conclusao: yup.number().typeError('Tem que ser um número').required('Esse campo é obrigatorio.').min(yup.ref('ano_inicio'), 'O ano de conclusão deve ser maior ou igual ao ano de início.'),
    semestre: yup.number().typeError('Tem que ser um número').required('Esse campo é obrigatorio.').min(1, 'O semestre deve ser maior que 0.')
});

export const EditFormacao = (props: IFormacoesAcademicasProps) => {
    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            curso: props.formacao.curso,
            instituicao: props.formacao.instituicao,
            ano_inicio: props.formacao.ano_inicio,
            ano_conclusao: props.formacao.ano_conclusao,
            semestre: props.formacao.semestre
        },
        resolver: yupResolver(EditFormacaoSchema),
        mode: 'onChange'
    });

    const handleEditFormacao = (data: Omit<TFormacao, 'id'>) => {
        updateFormacaoAcademica(props.formacao.id, data).then((res) => {
            props.setFormacoesAcademicas(props.formacoesAcademicas.map((formacao) => formacao.id === props.formacao.id ? res as TFormacao : formacao));
        });
    }
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(oldOpen => !oldOpen);
    }

    return (
        <>
            <Tooltip title={`Editar formação: ${props.formacao.curso} da ${props.formacao.instituicao}`} arrow placement='top'>
                <Fab color='primary' aria-label='edit' size='small' onClick={toggleOpen} >
                    <Icon>edit</Icon>
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(handleEditFormacao)}
            >
                <DialogTitle align='center' fontWeight='bold' >Atualizar Formação: {props.formacao.curso} da {props.formacao.instituicao}</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack gap={2}>
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
