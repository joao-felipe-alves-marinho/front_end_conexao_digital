import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Icon, IconButton, Stack, TextField, Tooltip } from '@mui/material';

import { IUser, TUpdateUserPayload, updateUser } from '../../../../services/api/userService/UserService';
import { IUserContext } from '../../../../layouts';

export function EditResumo(props: IUserContext) {
    const [resumo, setResumo] = useState(props.user?.resumo ?? '');

    const handleClearResumo = () => {
        setResumo('');
    }


    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setSuccess(false);
        if (resumo === null || resumo === undefined) {
            setResumo('');
        }
        const payload: TUpdateUserPayload = {
            ...props.user,
            resumo: resumo,
        };

        updateUser(payload)
            .then((res) => {
                setSuccess(true);
                const updatedUser = res as IUser; 
                props.setUser(updatedUser);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(oldOpen => !oldOpen);
    }



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
}