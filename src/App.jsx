import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isAuthenticated } from './auth/auth.js';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';

/**
 * Restringe el acceso a una ruta según el estado de autenticación actual.
 *
 * @param {{ children: import('react').ReactNode }} props Contenido protegido
 * que solo se renderiza para usuarios autenticados.
 * @returns {import('react').ReactNode} El contenido protegido o una
 * redirección a la pantalla de inicio de sesión.
 */
function ProtectedRoute({ children }) {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

/**
 * Define las rutas principales de la aplicación y su navegación por defecto.
 *
 * La pantalla de registro requiere autenticación. Las rutas desconocidas se
 * redirigen a registro o inicio de sesión según el estado de la sesión.
 *
 * @returns {import('react').JSX.Element} Árbol de rutas de la aplicación.
 */
function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('exam-theme') === 'dark');

    useEffect(() => {
        document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('exam-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <div className="app-shell">
            <button
                className="theme-toggle"
                type="button"
                aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
                aria-pressed={isDarkMode}
                onClick={() => setIsDarkMode((currentMode) => !currentMode)}
            >
                <span aria-hidden="true">{isDarkMode ? '☀' : '☾'}</span>
                <span>{isDarkMode ? 'Modo claro' : 'Modo oscuro'}</span>
            </button>

            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/registro"
                    element={
                        <ProtectedRoute>
                            <RegistrationPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="*"
                    element={<Navigate to={isAuthenticated() ? '/registro' : '/login'} replace />}
                />
            </Routes>
        </div>
    );
}

export default App;

/**
 * Cierra la sesión local del usuario y lo devuelve al inicio de sesión.
 *
 * El token se elimina del almacenamiento del navegador antes de forzar la
 * navegación para evitar que la sesión anterior pueda reutilizarse.
 *
 * @returns {void}
 */
export function signOut() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}
