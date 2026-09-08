const SESSION_KEY = 'exam-authenticated';
const ATTEMPTS_KEY = 'exam-login-attempts';
const LOCKED_UNTIL_KEY = 'exam-login-locked-until';
const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 30 * 1000;

export const DEMO_CREDENTIALS = {
    username: 'examen',
    password: 'Examen2026!',
};

export function isAuthenticated() {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function getLockState() {
    const lockedUntil = Number(sessionStorage.getItem(LOCKED_UNTIL_KEY) || 0);
    return {
        lockedUntil,
        isLocked: lockedUntil > Date.now(),
    };
}

export function authenticate(username, password) {
    const { lockedUntil, isLocked } = getLockState();
    if (isLocked) {
        return { success: false, locked: true };
    }

    if (lockedUntil) {
        sessionStorage.removeItem(LOCKED_UNTIL_KEY);
        sessionStorage.removeItem(ATTEMPTS_KEY);
    }

    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.removeItem(ATTEMPTS_KEY);
        return { success: true, locked: false };
    }

    const attempts = Number(sessionStorage.getItem(ATTEMPTS_KEY) || 0) + 1;
    sessionStorage.setItem(ATTEMPTS_KEY, String(attempts));

    if (attempts >= MAX_ATTEMPTS) {
        const nextLockedUntil = Date.now() + LOCK_DURATION_MS;
        sessionStorage.setItem(LOCKED_UNTIL_KEY, String(nextLockedUntil));
        return { success: false, locked: true, lockedUntil: nextLockedUntil };
    }

    return { success: false, locked: false };
}

export function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(ATTEMPTS_KEY);
    sessionStorage.removeItem(LOCKED_UNTIL_KEY);
}
