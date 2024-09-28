import { Chip, Stack } from '@mui/material';

import { IInteresse, deleteInteresse } from '../../../services/api/UserService/UserService';

type TInteresse = Omit<IInteresse, 'user'>;

interface IInteresseProps {
    interesses: TInteresse[];
    setInteresses: React.Dispatch<React.SetStateAction<TInteresse[]>>;
}

export const Interesses = (props: IInteresseProps) => {

    const handleDelete = (interesseId: number) => {
        deleteInteresse(interesseId)
            .then(() => {
                props.setInteresses(props.interesses.filter((interesse) => interesse.id !== interesseId));
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
};