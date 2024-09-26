import { Button, Card, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { IUser } from '../../../services/api/userService/UserService';

type IHabilidades = Pick<IUser, 'habilidades'>;

export function Habilidades(habilidades: IHabilidades) {
    return (
        <Table>
            <TableHead  >
                <TableRow>
                    <TableCell><strong>Nome</strong></TableCell>
                    <TableCell><strong>Nivel</strong></TableCell>
                    <TableCell align='right' ></TableCell>
                    <TableCell align='right' ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {habilidades.habilidades.map((habilidade, index) => (
                    <TableRow key={index}>
                        <TableCell>{habilidade.nome}</TableCell>
                        <TableCell>
                            {habilidade.nivel === 1 ? 'Iniciante' : habilidade.nivel === 2 ? 'Intermediario' : 'Avançado'}
                        </TableCell>
                        <TableCell align='right'>
                            <Button onClick={() => console.log('edited')}>Edit</Button>
                        </TableCell>
                        <TableCell align='right' >
                            <Button color='error' onClick={() => console.log('deleted')}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    );
}