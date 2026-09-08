import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
    authenticate,
    DEMO_CREDENTIALS,
    getLockState,
    isAuthenticated,
    logout,
} from '../auth/auth.js';

describe('auth', () => {
    beforeEach(() => {
        sessionStorage.clear();
        vi.restoreAllMocks();
    });

    it('indica que no hay una sesión autenticada inicialmente', () => {
        expect(isAuthenticated()).toBe(false);
    });

    it('autentica las credenciales demo y limpia intentos previos', () => {
        sessionStorage.setItem('exam-login-attempts', '2');

        const result = authenticate(DEMO_CREDENTIALS.username, DEMO_CREDENTIALS.password);

        expect(result).toEqual({ success: true, locked: false });
        expect(isAuthenticated()).toBe(true);
        expect(sessionStorage.getItem('exam-login-attempts')).toBeNull();
    });

    it('rechaza credenciales incorrectas y conserva el número de intentos', () => {
        const result = authenticate('usuario-invalido', 'clave-invalida');

        expect(result).toEqual({ success: false, locked: false });
        expect(isAuthenticated()).toBe(false);
        expect(sessionStorage.getItem('exam-login-attempts')).toBe('1');
    });

    it('bloquea el acceso después de cinco intentos fallidos', () => {
        for (let attempt = 0; attempt < 4; attempt += 1) {
            authenticate('usuario-invalido', 'clave-invalida');
        }

        const result = authenticate('usuario-invalido', 'clave-invalida');

        expect(result.success).toBe(false);
        expect(result.locked).toBe(true);
        expect(getLockState().isLocked).toBe(true);
    });

    it('no permite autenticar mientras la cuenta está bloqueada', () => {
        vi.spyOn(Date, 'now').mockReturnValue(1000);
        authenticate('usuario-invalido', 'clave-invalida');
        sessionStorage.setItem('exam-login-attempts', '4');
        sessionStorage.setItem('exam-login-locked-until', '31000');

        const result = authenticate(DEMO_CREDENTIALS.username, DEMO_CREDENTIALS.password);

        expect(result).toEqual({ success: false, locked: true });
        expect(isAuthenticated()).toBe(false);
    });

    it('cierra la sesión y elimina el estado de autenticación', () => {
        authenticate(DEMO_CREDENTIALS.username, DEMO_CREDENTIALS.password);

        logout();

        expect(isAuthenticated()).toBe(false);
        expect(sessionStorage.getItem('exam-login-attempts')).toBeNull();
        expect(sessionStorage.getItem('exam-login-locked-until')).toBeNull();
    });
});
