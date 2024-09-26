import { Chip, Stack } from '@mui/material';
import { IUser } from '../../../services/api/userService/UserService';

type IInteresses = Pick<IUser, 'interesses'>;

export function Interesses(interesses: IInteresses) {

    function handleDelete(interesse_id) {

    }

    return (
        <Stack direction='row' spacing={1} >
            {interesses.interesses.map((interesse) => (
                <Chip color='primary' label={interesse.nome} key={interesse.id} onDelete={handleDelete(interesse.id)} />
            ))}
        </Stack>
    );
}