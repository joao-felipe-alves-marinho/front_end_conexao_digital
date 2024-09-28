import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Icon, IconButton, Stack, TextField, Tooltip } from '@mui/material';

import { IUser, TUpdateUserPayload, updateUser } from '../../../../services/api/UserService/UserService';
import { IUserContext } from '../../../../layouts';

export const EditResumo = (props: IUserContext) => {
    const [resumo, setResumo] = useState(props.user?.resumo ?? '');

    const handleClearResumo = () => {
        setResumo('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (resumo === null || resumo === undefined) {
            setResumo('');
        }
        const payload: TUpdateUserPayload = {
            ...props.user,
            resumo: resumo,
        };

        updateUser(payload)
            .then((res) => {
                const updatedUser = res as IUser;
                props.setUser(updatedUser);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(oldOpen => !oldOpen);
    
    return (
        <>
            <Tooltip title='Editar resumo' arrow placement='top' >
                <Fab id='fab-edit-resumo' color='primary' aria-label='edit' size='medium' onClick={toggleOpen} >
                    <Icon>edit</Icon>
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                onClose={toggleOpen}
                fullWidth
                component='form'
                onSubmit={handleSubmit}
            >
                <DialogTitle align='center' fontWeight='bold' >Resumo</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2} >
                        <TextField
                            value={resumo}
                            onChange={e => setResumo(e.target.value)}
                            label=''
                            placeholder='Resumo...'
                            fullWidth
                            multiline
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={handleClearResumo} >
                                        <Icon>clear</Icon>
                                    </IconButton>
                                )
                            }}
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