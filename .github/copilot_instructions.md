# Instrucciones para desarrollo seguro

## Proyecto
- Este proyecto es una aplicación web con React + Vite + React Router.
- El objetivo principal es gestionar la autenticación de usuarios y el registro de examen con validaciones del lado del cliente.
- Antes de modificar la lógica de autenticación, rutas protegidas, formularios o carga de archivos, revisar el flujo completo para no introducir brechas de seguridad ni romper la experiencia del usuario.

## Stack
- Frontend: React 19, Vite, React Router DOM.
- Estilo: CSS modular/customizado en la carpeta src/styles, preferiblemente con clases descriptivas y consistencia visual.
- Persistencia local: sessionStorage para estado de sesión y bloqueo temporal de intentos de login.

## Convenciones
- Usa camelCase para variables, funciones y props.
- Mantén nombres descriptivos para estado, handlers y validaciones.
- No agregues lógica compleja dentro de JSX; usa funciones auxiliares para validaciones y manejo de eventos.
- Sigue una estructura clara: componentes, páginas, utilidades y autenticación separadas por responsabilidad.

## Seguridad general
- Nunca expongas secretos, claves, tokens, contraseñas ni credenciales en código fuente, logs, commits o comentarios.
- Si en el futuro se agrega backend o variables de entorno, usar archivos de configuración seguros y nunca incluir valores reales en repositorio.
- No ejecutes comandos destructivos, consultas a bases de datos, operaciones de despliegue o modificaciones de infraestructura sin confirmación previa.
- Toda consulta, petición o comando que implique acceso a datos sensibles debe ser revisado antes de ejecutarse; si corresponde, solo se indica la acción a realizar, no se ejecuta directamente.
- No utilices eval, innerHTML, dangerouslySetInnerHTML ni lógica que convierta texto de usuario en HTML ejecutable.
- Evita exponer información sensible en mensajes de error o en la UI.

## Autenticación y autorización
- La autenticación del lado del cliente solo debe usarse para UX y flujo de aplicación; no reemplaza la validación real del servidor.
- No confíes únicamente en sessionStorage/localStorage para proteger datos críticos o acceso a recursos restringidos.
- Cualquier ruta protegida debe verificar el estado real de autenticación antes de renderizar contenido sensible.
- No cambies el flujo de login/logout sin respetar el manejo correcto del estado de sesión y bloqueo por intentos fallidos.
- No permitas bypasses de acceso a rutas protegidas mediante manipulación de la URL o variables del navegador.

## Validación de entradas y formularios
- Valida siempre datos de entrada del usuario antes de procesarlos.
- Rechaza entradas vacías, formatos inválidos y valores fuera de rango.
- Para formularios de registro: valida nombre, correo, teléfono, edad y documento según requisitos reales.
- Nunca asumas que un archivo subido es seguro solo por su extensión o por el nombre.
- Si se trabaja con archivos, valida MIME, extensión y tamaño. Ejemplo: PDF solo, máximo 10 MB, sin aceptar tipos inesperados.
- No guardes archivos temporales arbitrarios sin controlar su contenido y origen.

## Manejo seguro de archivos
- Restringe uploads a tipos esperados y utiliza validaciones explícitas antes de aceptar un archivo.
- Revisa siempre el tamaño, tipo y nombre del archivo antes de procesarlo.
- No conviertas contenido de archivo no verificado en texto, visualización ni almacenamiento permanente sin validación previa.
- Evita mostrar previews de archivos desde fuentes no confiables.

## Seguridad en frontend
- Sanitiza y limita cualquier contenido dinámico renderizado desde datos externos o de usuario.
- No uses datos no validados para construir rutas, parámetros, URLs, IDs o mensajes visibles.
- Mantén componentes pequeños y con responsabilidades claras para facilitar revisiones de seguridad.
- Si agregas librerías nuevas, revisa si son necesarias, seguras y mantenidas.
- No instales dependencias sin evaluar riesgos de seguridad, compatibilidad y mantenimiento.

## Reglas para cambios en este repositorio
- Antes de modificar autenticación, estado de sesión, formularios o archivos cargados, verificar el impacto completo.
- Mantén mensajes de error útiles, pero sin revelar detalles internos del sistema ni de credenciales.
- Si se detecta un problema potencial, documenta el riesgo y corrige la causa raíz, no solo el síntoma.
- Las correcciones deben priorizar robustez, validación y minimización de riesgo sobre rapidez.

## Diseño
- Usa TailwindCSS para el diseño visual cuando sea posible y mantén una estética limpia, consistente y accesible.
- Usa colores pastel y suaves, evitando tonos muy saturados o bajos en contraste.
- Mantén una experiencia accesible: etiquetas visibles, foco adecuado y mensajes de error con roles ARIA cuando corresponda.

## Criterio de aprobación antes de operaciones sensibles
- Cualquier acción que modifique datos, ejecute comandos en entorno real, haga consultas o manipule infraestructura debe contar con aprobación explícita antes de ejecutarse.
- Cuando no se pueda ejecutar una acción por seguridad, se debe indicar claramente la operación recomendada y la razón técnica.

## Checklist antes de cerrar un cambio
- ¿Se validaron entradas del usuario?
- ¿Se evitó la exposición de secretos o credenciales?
- ¿Se revisó el flujo de autenticación y rutas protegidas?
- ¿Se manejaron archivos de forma segura?
- ¿La UI sigue siendo accesible y no exponiendo datos sensibles?
- ¿El cambio no introdujo riesgos de seguridad ni lógica insegura?
