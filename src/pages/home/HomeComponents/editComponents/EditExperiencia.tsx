import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Icon, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { IExperienciaProfissional, updateExperienciaProfissional } from '../../../../services/api/UserService/UserService';

type TExperiencia = Omit<IExperienciaProfissional, 'user'>;

interface IExperienciasProfissionaisProps {
    experiencia: TExperiencia;
    experienciasProfissionais: TExperiencia[];
    setExperienciasProfissionais: React.Dispatch<React.SetStateAction<TExperiencia[]>>;
}


const EditExperienciaSchema = yup.object({
    cargo: yup.string().required('Esse campo é obrigatorio.').min(3, 'O nome do cargo deve ter pelo menos 3 caracteres.').max(255, 'O nome do cargo deve ter no máximo 255 caracteres.'),
    empresa: yup.string().required('Esse campo é obrigatorio.').min(3, 'O nome da empresa deve ter pelo menos 3 caracteres.').max(255, 'O nome da empresa deve ter no máximo 255 caracteres.'),
    ano_inicio: yup.number().typeError('Tem que ser um número').required('Esse campo é obrigatorio.'),
    ano_fim: yup.number().typeError('Tem que ser um número'),
    descricao: yup.string().max(255, 'A descrição deve ter no máximo 255 caracteres.')
});

export const EditExperiencia = (props: IExperienciasProfissionaisProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            cargo: props.experiencia.cargo,
            empresa: props.experiencia.empresa,
            ano_inicio: props.experiencia.ano_inicio,
            ano_fim: props.experiencia.ano_fim,
            descricao: props.experiencia.descricao
        },
        resolver: yupResolver(EditExperienciaSchema),
        mode: 'onChange'
    });

    const handleEditExperiencia = (data: Omit<TExperiencia, 'id'>) => {
        updateExperienciaProfissional(props.experiencia.id, data).then((res) => {
            props.setExperienciasProfissionais(props.experienciasProfissionais.map((experiencia) => experiencia.id === props.experiencia.id ? res as TExperiencia : experiencia));
        });
    };
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(oldOpen => !oldOpen);
    };

    return (
        <>
            <Tooltip title={`Editar Experiencia Profissional: ${props.experiencia.cargo} da ${props.experiencia.empresa}`} arrow placement='top'>
                <Fab color='primary' aria-label='edit' size='small' onClick={toggleOpen} >
                    <Icon>edit</Icon>
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(handleEditExperiencia)}
            >
                <DialogTitle align='center' fontWeight='bold'>
                    Atualizar Experiencia: {props.experiencia.cargo} da {props.experiencia.empresa}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack gap={2}>
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
                </DialogContent>
                <DialogActions>
                    <Button fullWidth onClick={toggleOpen} type='submit'>
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
};
