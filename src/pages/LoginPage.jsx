import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { authenticate, getLockState, isAuthenticated } from '../auth/auth.js';

const LOCK_MESSAGE = 'Demasiados intentos. Espera unos segundos e inténtalo de nuevo.';

function LoginPage() {
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLocked, setIsLocked] = useState(() => getLockState().isLocked);

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    useEffect(() => {
        if (!isLocked) return undefined;

        const intervalId = window.setInterval(() => {
            setIsLocked(getLockState().isLocked);
        }, 250);

        return () => window.clearInterval(intervalId);
    }, [isLocked]);

    if (isAuthenticated()) {
        return <Navigate to="/registro" replace />;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError('');

        if (!event.currentTarget.reportValidity()) return;

        const result = authenticate(username, password);
        if (result.success) {
            navigate('/registro', { replace: true });
            return;
        }

        setIsLocked(result.locked);
        setError(result.locked ? LOCK_MESSAGE : 'El usuario o la contraseña no son correctos.');
        passwordRef.current?.select();
    }

    return (
        <main className="auth-page">
            <p className="eyebrow">Portal de exámenes</p>
            <h1>Inicia sesión</h1>
            <p className="description">Accede para completar tu registro al examen.</p>

            <form onSubmit={handleSubmit} noValidate>
                <p>
                    <label htmlFor="usuario">Usuario</label>
                    <input
                        ref={usernameRef}
                        type="text"
                        id="usuario"
                        name="usuario"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        aria-invalid={Boolean(error)}
                    />
                </p>
                <p>
                    <label htmlFor="contrasena">Contraseña</label>
                    <input
                        ref={passwordRef}
                        type="password"
                        id="contrasena"
                        name="contrasena"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        aria-invalid={Boolean(error)}
                    />
                </p>
                <p className="error-message" role="alert" aria-live="polite">{error}</p>
                <button type="submit" disabled={isLocked}>Iniciar sesión</button>
            </form>
        </main>
    );
}

export default LoginPage;
