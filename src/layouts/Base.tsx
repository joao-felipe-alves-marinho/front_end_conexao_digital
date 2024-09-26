import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export function Base() {
    return (
        <Container maxWidth='sm'>
            <Outlet />
        </Container>
    );
}