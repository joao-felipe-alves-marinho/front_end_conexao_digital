import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Icon, Stack, TextField, Tooltip } from '@mui/material';

import { IInteresse, createInteresse } from '../../../../services/api/UserService/UserService';

type TInteresse = Omit<IInteresse, 'user'>;

interface IInteresseProps {
    interesses: TInteresse[];
    setInteresses: React.Dispatch<React.SetStateAction<TInteresse[]>>;
}

export const AddInteresse = (props: IInteresseProps) => {
    const [interesse, setInteresse] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (interesse) {
            createInteresse({ nome: interesse })
                .then((res) => {
                    if (!res) return;
                    const response: TInteresse = {id: res.id, nome: res.nome};
                    props.setInteresses(props.interesses.concat(response));
                });
        }
    };

    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(oldOpen => !oldOpen);
    };

    return (
        <>
            <Tooltip title='Adicionar um novo interesse' arrow placement='top'>
                <Fab id='fab-add-interesse' color='success' aria-label='add-interesse' size='medium' onClick={toggleOpen}>
                    <Icon>add</Icon>
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit}
            >
                <DialogTitle align='center' fontWeight='bold'>Novo Interesse</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            value={interesse}
                            onChange={e => setInteresse(e.target.value)}
                            label=''
                            placeholder='Data Science'
                            fullWidth
                            required
                        />
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
};
