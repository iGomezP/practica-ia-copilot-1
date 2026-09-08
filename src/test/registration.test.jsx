import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App.jsx';
import { renderWithRouter } from './test-utils.jsx';

describe('RegistrationPage', () => {
    beforeEach(() => {
        sessionStorage.clear();
        sessionStorage.setItem('exam-authenticated', 'true');
    });

    it('muestra los campos principales y enfoca el nombre', () => {
        renderWithRouter(<App />, ['/registro']);

        expect(screen.getByRole('heading', { name: 'Registro al examen' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Nombre completo' })).toHaveFocus();
        expect(screen.getByRole('textbox', { name: 'Dirección' })).toBeInTheDocument();
        expect(screen.getByRole('spinbutton', { name: 'Edad' })).toBeInTheDocument();
    });

    it('cierra la sesión y vuelve al login', async () => {
        renderWithRouter(<App />, ['/registro']);

        fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }));

        expect(sessionStorage.getItem('exam-authenticated')).toBeNull();
        expect(await screen.findByRole('heading', { name: 'Inicia sesión' })).toBeInTheDocument();
    });
});
