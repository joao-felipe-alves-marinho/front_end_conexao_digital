import { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControl, FormControlLabel, Icon, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Tooltip } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { IHabilidade, updateHabilidade } from '../../../../services/api/userService/UserService';

type THabilidade = Omit<IHabilidade, 'user'>;

interface IHabilidadesProps {
    habilidade: THabilidade;
    habilidades: THabilidade[];
    setHabilidades: React.Dispatch<React.SetStateAction<THabilidade[]>>;
}

const EditHabilidadeSchema = yup.object({
    nome: yup.string().required('Esse campo é obrigatorio.').min(3, 'O nome deve ter pelo menos 3 caracteres.').max(255, 'O nome deve ter no máximo 255 caracteres.'),
    nivel: yup.number().required('Esse campo é obrigatorio.').oneOf([1, 2, 3], 'Escolha um nível válido: 1, 2 ou 3.')
});

export const EditHabilidade = (props: IHabilidadesProps) => {
    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            nome: props.habilidade.nome,
            nivel: props.habilidade.nivel
        },
        resolver: yupResolver(EditHabilidadeSchema),
        mode: 'onChange'
    });

    const handleEditHabilidade = (data: Omit<THabilidade, 'id'>) => {
        updateHabilidade(props.habilidade.id, data).then((res) => {
            props.setHabilidades(props.habilidades.map((habilidade) => habilidade.id === props.habilidade.id ? res as THabilidade : habilidade));
        });
    }
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(oldOpen => !oldOpen);
    }

    return (
        <>
            <Tooltip title={`Editar Habilidade: ${props.habilidade.nome}`} arrow placement='top' >
                <Button onClick={toggleOpen}>Edit</Button>
            </Tooltip>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit(handleEditHabilidade)}
            >
                <DialogTitle align='center' fontWeight='bold' >Atualizar Habilidade: {props.habilidade.nome}</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2} >
                        <TextField
                            fullWidth
                            label='Nome'
                            variant='outlined'
                            {...register('nome')}
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                        />
                        <FormControl>
                            <InputLabel id='nivel-label'>Nivel</InputLabel>
                            <Select
                                label='Nivel'
                                labelId='genero-label'
                                id='genero'
                                {...register('nivel')}
                                error={!!errors.nivel}
                                defaultValue={props.habilidade.nivel}
                            >
                                <MenuItem value='1'>Iniciante</MenuItem>
                                <MenuItem value='2'>Intermediario</MenuItem>
                                <MenuItem value='3'>Avançado</MenuItem>
                            </Select>
                        </FormControl>
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
