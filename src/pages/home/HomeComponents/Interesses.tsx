import { useState } from 'react';
import { Chip, Stack } from '@mui/material';

import { IInteresse, IUser, deleteInteresse } from '../../../services/api/userService/UserService';

type TInteresse = Omit<IInteresse, 'user'>;

interface IInteresseProps {
    interesses: TInteresse[];
    setInteresses: React.Dispatch<React.SetStateAction<TInteresse[]>>;
}

export function Interesses(props: IInteresseProps) {

    const handleDelete = (id: number) => {
        deleteInteresse(id)
            .then(() => {
                props.setInteresses(props.interesses.filter((interesse) => interesse.id !== id));
            });
    };

    return (
        <Stack direction="row" spacing={1}>
            {props.interesses.length > 0 && props.interesses.map((interesse) => (
                interesse && (
                    <Chip
                        color="primary"
                        label={interesse.nome}
                        key={interesse.id}
                        onDelete={() => handleDelete(interesse.id)}
                    />
                )
            ))}
        </Stack>
    );
}