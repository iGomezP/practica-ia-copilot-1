import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth/auth.js';

function RegistrationPage() {
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        nameRef.current?.focus();
    }, []);

    function handleLogout() {
        logout();
        navigate('/login', { replace: true });
    }

    function validateFile(file) {
        if (!file) {
            setSelectedFile(null);
            setFileError('Selecciona un archivo PDF.');
            return false;
        }

        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
        if (!isPdf) {
            setSelectedFile(null);
            setFileError('Solo se permiten archivos PDF.');
            return false;
        }

        if (file.size > 10 * 1024 * 1024) {
            setSelectedFile(null);
            setFileError('El PDF no puede superar los 10 MB.');
            return false;
        }

        setSelectedFile(file);
        setFileError('');
        return true;
    }

    function handleFileChange(event) {
        validateFile(event.target.files[0]);
    }

    function handleDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        validateFile(event.dataTransfer.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        validateFile(selectedFile);
    }

    return (
        <main className="registration-page">
            <div className="registration-header">
                <div>
                    <h1>Registro al examen</h1>
                    <p>Completa tus datos para registrarte.</p>
                </div>
                <button className="logout-button" type="button" onClick={handleLogout}>Cerrar sesión</button>
            </div>

            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="nombre">Nombre completo</label>
                    <input ref={nameRef} type="text" id="nombre" name="nombre" autoComplete="name" required />
                </p>
                <p>
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="tel" id="telefono" name="telefono" autoComplete="tel" required />
                </p>
                <p>
                    <label htmlFor="correo">Correo electrónico</label>
                    <input type="email" id="correo" name="correo" autoComplete="email" required />
                </p>
                <p>
                    <label htmlFor="direccion">Dirección</label>
                    <textarea id="direccion" name="direccion" rows="3" autoComplete="street-address" />
                </p>
                <p>
                    <label htmlFor="edad">Edad</label>
                    <input type="number" id="edad" name="edad" min="1" max="120" required />
                </p>
                <div className="file-field">
                    <span className="field-label">Documento PDF</span>
                    <div
                        className={`file-dropzone${isDragging ? ' is-dragging' : ''}`}
                        onDragEnter={(event) => {
                            event.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragOver={(event) => event.preventDefault()}
                        onDragLeave={(event) => {
                            if (event.currentTarget === event.target) {
                                setIsDragging(false);
                            }
                        }}
                        onDrop={handleDrop}
                    >
                        <p>{selectedFile ? selectedFile.name : 'Arrastra tu PDF aquí'}</p>
                        <span>o</span>
                        <button type="button" onClick={() => fileInputRef.current?.click()}>
                            Buscar archivo
                        </button>
                        <input
                            ref={fileInputRef}
                            className="visually-hidden"
                            type="file"
                            id="documento"
                            name="documento"
                            accept="application/pdf,.pdf"
                            onChange={handleFileChange}
                            required
                        />
                        <small>PDF de hasta 10 MB</small>
                    </div>
                    <p className="error-message" role="alert">{fileError}</p>
                </div>
                <button type="submit">Registrarme</button>
            </form>
        </main>
    );
}

export default RegistrationPage;
