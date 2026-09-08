import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App.jsx';
import { DEMO_CREDENTIALS } from '../auth/auth.js';
import { renderWithRouter } from './test-utils.jsx';

describe('App', () => {
    beforeEach(() => {
        sessionStorage.clear();
        localStorage.clear();
    });

    it('redirige una ruta protegida al login si no hay sesión', () => {
        renderWithRouter(<App />, ['/registro']);

        expect(screen.getByRole('heading', { name: 'Inicia sesión' })).toBeInTheDocument();
    });

    it('muestra el registro cuando existe una sesión autenticada', () => {
        sessionStorage.setItem('exam-authenticated', 'true');

        renderWithRouter(<App />, ['/registro']);

        expect(screen.getByRole('heading', { name: 'Registro al examen' })).toBeInTheDocument();
    });

    it('redirige las rutas desconocidas según el estado de sesión', () => {
        renderWithRouter(<App />, ['/ruta-inexistente']);

        expect(screen.getByRole('heading', { name: 'Inicia sesión' })).toBeInTheDocument();
    });

    it('permite iniciar sesión y navegar al registro', async () => {
        renderWithRouter(<App />, ['/login']);

        fireEvent.change(screen.getByRole('textbox', { name: 'Usuario' }), {
            target: { value: DEMO_CREDENTIALS.username },
        });
        fireEvent.change(screen.getByLabelText('Contraseña'), {
            target: { value: DEMO_CREDENTIALS.password },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

        expect(await screen.findByRole('heading', { name: 'Registro al examen' })).toBeInTheDocument();
    });

    it('muestra un error cuando las credenciales no son correctas', () => {
        renderWithRouter(<App />, ['/login']);

        fireEvent.change(screen.getByRole('textbox', { name: 'Usuario' }), {
            target: { value: 'incorrecto' },
        });
        fireEvent.change(screen.getByLabelText('Contraseña'), {
            target: { value: 'incorrecta' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

        expect(screen.getByRole('alert')).toHaveTextContent('El usuario o la contraseña no son correctos.');
        expect(screen.getByRole('heading', { name: 'Inicia sesión' })).toBeInTheDocument();
    });

    it('deshabilita el login cuando la sesión está bloqueada', () => {
        sessionStorage.setItem('exam-login-locked-until', String(Date.now() + 30_000));

        renderWithRouter(<App />, ['/login']);

        expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeDisabled();
    });

    it('permite alternar y conserva el modo oscuro', () => {
        renderWithRouter(<App />, ['/login']);

        const themeButton = screen.getByRole('button', { name: 'Activar modo oscuro' });
        fireEvent.click(themeButton);

        expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
        expect(localStorage.getItem('exam-theme')).toBe('dark');
        expect(screen.getByRole('button', { name: 'Activar modo claro' })).toHaveAttribute('aria-pressed', 'true');
    });
});
