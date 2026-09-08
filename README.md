# Portal de examenes

Aplicacion frontend para el registro de candidatos a un examen. Incluye inicio de sesion de demostracion, formulario de registro, carga de un documento PDF y selector persistente de tema claro u oscuro.

> **Alcance:** este proyecto es una demo ejecutada completamente en el navegador. No incluye backend, base de datos ni envio real de formularios.

## Requisitos

- Node.js 20 o posterior recomendado.
- npm 10 o posterior.

## Instalacion

```bash
npm install
```

## Desarrollo

Inicia el servidor local con:

```bash
npm run dev
```

Vite mostrara la URL local, normalmente `http://localhost:5173`.

Para exponer el servidor en la red local:

```bash
npm run dev -- --host 0.0.0.0
```

## Scripts disponibles

| Comando | Descripcion |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run build` | Genera el bundle optimizado en `dist/`. |
| `npm run preview` | Sirve localmente el bundle generado. |
| `npm test` | Ejecuta la suite de pruebas una vez. |
| `npm run test:watch` | Ejecuta Vitest en modo observacion. |

## Flujo de la aplicacion

1. El usuario accede a `/login`.
2. Introduce las credenciales de demostracion.
3. Si la autenticacion es correcta, se redirige a `/registro`.
4. Completa sus datos y selecciona un documento PDF.
5. Puede cerrar la sesion desde el formulario de registro.

### Rutas

| Ruta | Acceso | Funcion |
| --- | --- | --- |
| `/login` | Publico | Inicio de sesion. |
| `/registro` | Requiere sesion | Formulario de registro al examen. |
| Cualquier otra | Automatico | Redirecciona segun el estado de autenticacion. |

## Credenciales de demostracion

```text
Usuario: examen
Contrasena: Examen2026!
```

Estas credenciales estan definidas en `src/auth/auth.js` y solo sirven para la demo local. No deben utilizarse como mecanismo de autenticacion real.

## Validaciones implementadas

- Los campos obligatorios del formulario se validan mediante HTML.
- El documento debe ser PDF, por tipo MIME o extension `.pdf`.
- El documento no puede superar los 10 MB.
- Despues de cinco intentos de inicio de sesion fallidos, el acceso se bloquea durante 30 segundos.
- Los mensajes de error se muestran en la interfaz y se anuncian con `role="alert"`.

## Persistencia en el navegador

La aplicacion usa almacenamiento del navegador para una experiencia local:

- `sessionStorage` mantiene la sesion, los intentos fallidos y el bloqueo temporal.
- `localStorage` guarda la preferencia de tema bajo la clave `exam-theme`.

Al limpiar los datos del sitio se eliminan estas preferencias y la sesion local.

## Estructura principal

```text
src/
├── App.jsx                  # Rutas, proteccion de registro y tema visual
├── main.jsx                 # Punto de entrada de React
├── auth/
│   └── auth.js              # Autenticacion y control de intentos
├── pages/
│   ├── LoginPage.jsx        # Inicio de sesion
│   └── RegistrationPage.jsx # Registro y carga del PDF
├── styles/
│   └── global.css           # Tokens, layout, responsive y temas
└── test/
    ├── app.test.jsx         # Rutas, login y tema
    ├── auth.test.js         # Logica de autenticacion
    ├── registration.test.jsx# Flujo de registro
    ├── setup.js             # Configuracion de Vitest
    └── test-utils.jsx       # Utilidades de renderizado
```

## Pruebas y build

Antes de publicar cambios, ejecuta:

```bash
npm test
npm run build
```

Las pruebas usan Vitest, `jsdom` y React Testing Library. Comprueban la navegacion, autenticacion, bloqueo por intentos, cierre de sesion, validacion del registro y alternancia del tema.

## Consideraciones para produccion

Este repositorio no implementa controles suficientes para un entorno real:

- Las credenciales y toda la logica de autenticacion estan en el cliente.
- El estado de sesion puede ser modificado desde las herramientas del navegador.
- El archivo PDF se valida localmente, pero no se sube ni se analiza en un servidor.
- No existe persistencia de candidatos ni proteccion de API.

Para convertirlo en una aplicacion productiva seria necesario añadir un backend, autenticacion segura, validacion server-side, almacenamiento protegido de documentos, control de permisos, observabilidad y una politica de privacidad acorde al tratamiento de datos personales.
